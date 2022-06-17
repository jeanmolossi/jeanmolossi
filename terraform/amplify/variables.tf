variable "project_name" {
  type        = string
  description = "The name of the project"
}

variable "repository_source" {
  type        = string
  description = "The source of the repository. Ex: https://github.com/org/repo.git"
}

variable "region" {
  type        = string
  description = "The AWS region"
}

variable "route53_zone_name" {
  type        = string
  description = "The name of the Route53 zone"
}

variable "ghp_token" {
  type        = string
  description = "The GitHub Personal Access Token"
}

variable "kibana_password" {
  type        = string
  description = "the kibana password"
}

variable "amplify_cloudfront_id" {
  type = string
  description = "value of the CloudFront distribution id"
}
