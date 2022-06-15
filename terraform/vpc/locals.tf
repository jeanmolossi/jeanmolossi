locals {
  default_tags = {
    ProjectName = var.project_name
    Repository  = var.repository_source
    Mainteiner  = "Terraform"
  }
}
