locals {
  default_tags = {
    ProjectName = var.project_name
    Repository  = var.repository_source
    Mainteiner  = "Terraform"
  }

  branches = {
    main = {
      env         = "production"
      stage       = "PRODUCTION"
      sub_domain  = format("%s", var.route53_zone_name)
      branch_name = "main"
    }
  }
}
