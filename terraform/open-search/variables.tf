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

variable "encrypt_kms_key_id" {
  description = "The KMS key ID to encrypt the OpenSearch cluster with. If not specified, then it defaults to using the AWS OpenSearch Service KMS key."
  type        = string
  default     = ""
}

variable "kibana_password" {
  type        = string
  description = "the kibana password"
}
