terraform {
  required_version = "~> 1.1.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.9.0"
    }
  }

  backend "s3" {
    key     = "company-experience/amplify/terraform.tfstate"
    encrypt = false
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_amplify_app" "this" {
  name       = format("pwa-%s", lower(var.project_name))
  repository = local.default_tags["Repository"]

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - yarn install
        build:
          commands:
            - yarn run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  access_token         = var.ghp_token
  iam_service_role_arn = data.aws_iam_role.amplifyconsole.arn

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/"
  }

  custom_rule {
    source = "/<*>"
    status = "200"
    target = "https://d1528p1wz2k5ez.amplifyapp.com/<*>"
  }

  tags = merge(
    local.default_tags,
    { "amplify:project_name" = var.project_name }
  )
}

resource "aws_amplify_branch" "this" {
  for_each = local.branches

  app_id = aws_amplify_app.this.id
  # branch_name = "develop"
  branch_name = lookup(each.value, "branch_name", "develop")

  framework = "Next.js - SSR"
  stage     = upper(lookup(each.value, "stage", "DEVELOPMENT"))

  environment_variables = {
    ENV = lookup(each.value, "env", "development")
  }
}

# resource "aws_amplify_domain_association" "this" {
#   for_each = local.branches

#   app_id      = aws_amplify_app.this.id
#   domain_name = lookup(each.value, "sub_domain", var.project_name)

#   sub_domain {
#     branch_name = aws_amplify_branch.this[each.key].branch_name
#     prefix      = ""
#   }
#   sub_domain {
#     branch_name = aws_amplify_branch.this[each.key].branch_name
#     prefix      = "www"
#   }
# }

resource "aws_amplify_webhook" "master" {
  for_each = local.branches

  app_id      = aws_amplify_app.this.id
  branch_name = aws_amplify_branch.this[each.key].branch_name
  description = format("Webhook for branch %s", aws_amplify_branch.this[each.key].branch_name)
}
