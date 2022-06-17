data "aws_caller_identity" "current" {}

data "aws_route53_zone" "this" {
  name         = var.route53_zone_name
  private_zone = false
}

data "aws_acm_certificate" "this" {
  domain = "*.${var.route53_zone_name}"

  statuses = ["ISSUED"]
}
