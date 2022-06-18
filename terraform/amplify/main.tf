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
    source = "/"
    status = "200"
    target = data.aws_cloudfront_distribution.amplify_cloudfront_id.domain_name
  }

  custom_rule {
    source = "/<*>"
    status = "200"
    target = "${data.aws_cloudfront_distribution.amplify_cloudfront_id.domain_name}/<*>"
  }

  custom_rule {
    source = "/_next/<*>"
    status = "200"
    target = "${data.aws_cloudfront_distribution.amplify_cloudfront_id.domain_name}/_next/<*>"
  }

  custom_rule {
    source = "/videos/<*>"
    status = "200"
    target = "${data.aws_cloudfront_distribution.amplify_cloudfront_id.domain_name}/videos/<*>"
  }

  custom_rule {
    source = "/artigo/<*>"
    status = "200"
    target = "${data.aws_cloudfront_distribution.amplify_cloudfront_id.domain_name}/artigo/<*>"
  }

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/"
  }

  custom_rule {
    source = "https://jeanmolossi.com.br"
    status = "301"
    target = "https://www.jeanmolossi.com.br"
  }

  tags = merge(
    local.default_tags,
    { "amplify:project_name" = var.project_name }
  )
}

resource "aws_amplify_branch" "this" {
  for_each = local.branches

  app_id      = aws_amplify_app.this.id
  branch_name = lookup(each.value, "branch_name", "develop")

  framework = "Next.js - SSR"
  stage     = upper(lookup(each.value, "stage", "DEVELOPMENT"))

  environment_variables = {
    ENV                         = lookup(each.value, "env", "development")
    DEV_TO_BASE_URL             = lookup(each.value, "DEV_TO_BASE_URL", "")
    DEV_TO_API_KEY              = lookup(each.value, "DEV_TO_API_KEY", "")
    NEXT_PUBLIC_DEV_TO_BASE_URL = lookup(each.value, "NEXT_PUBLIC_DEV_TO_BASE_URL", "")
    NEXT_PUBLIC_GA_TRACKING_ID  = lookup(each.value, "NEXT_PUBLIC_GA_TRACKING_ID", "")
  }
}

resource "aws_amplify_domain_association" "this" {
  for_each = local.branches

  app_id      = aws_amplify_app.this.id
  domain_name = lookup(each.value, "sub_domain", var.project_name)

  sub_domain {
    branch_name = aws_amplify_branch.this[each.key].branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.this[each.key].branch_name
    prefix      = "www"

  }
}

resource "aws_amplify_webhook" "master" {
  for_each = local.branches

  app_id      = aws_amplify_app.this.id
  branch_name = aws_amplify_branch.this[each.key].branch_name
  description = format("Webhook for branch %s", aws_amplify_branch.this[each.key].branch_name)
}
