terraform {
  required_version = "1.1.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.8.0"
    }
  }

  backend "s3" {
    key     = "vpc/terraform.tfstate"
    encrypt = false
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "172.0.0.0/16"

  tags = merge(
    local.default_tags,
    { Name = format("vpc-%s", var.project_name) }
  )
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(
    local.default_tags,
    { Name = format("igw-%s", var.project_name) }
  )
}

resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(
    local.default_tags,
    { Name = format("route-table-%s", var.project_name) }
  )
}

resource "aws_security_group" "allow_ingress" {
  name        = "allow_ingress"
  description = "Allow all internet ingress"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    local.default_tags,
    { Name = format("sg-%s", var.project_name) }
  )
}

resource "aws_subnet" "main" {
  for_each = {
    a = 1
    b = 2
    c = 3
    d = 4
    e = 5
    f = 6
  }

  vpc_id            = aws_vpc.main.id
  availability_zone = format("%s%s", var.region, each.key)
  cidr_block        = format("172.0.%d.0/24", each.value)

  tags = merge(
    local.default_tags,
    { Name = format("subnet-%s", var.project_name) }
  )
}

# resource "aws_acm_certificate" "this" {
#   domain_name       = format("%s", var.route53_zone_name)
#   validation_method = "DNS"

#   tags = merge(
#     local.default_tags,
#     { Name = format("cert-%s", var.project_name) }
#   )
# }

# resource "aws_route53_record" "this" {
#   for_each = {
#     for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
#       name   = dvo.resource_record_name
#       record = dvo.resource_record_value
#       type   = dvo.resource_record_type
#     }
#   }

#   allow_overwrite = true
#   name            = each.value.name
#   records         = [each.value.record]
#   ttl             = 60
#   type            = each.value.type
#   zone_id         = data.aws_route53_zone.this.zone_id
# }

# resource "aws_acm_certificate_validation" "this" {
#   certificate_arn         = aws_acm_certificate.this.arn
#   validation_record_fqdns = [for record in aws_route53_record.this : record.fqdn]
# }


# resource "aws_acm_certificate" "subdomain" {
#   domain_name       = format("*.%s", var.route53_zone_name)
#   validation_method = "DNS"

#   tags = merge(
#     local.default_tags,
#     { Name = format("subdomain-cert-%s", var.project_name) }
#   )
# }

# resource "aws_route53_record" "subdomain" {
#   for_each = {
#     for dvo in aws_acm_certificate.subdomain.domain_validation_options : dvo.domain_name => {
#       name   = dvo.resource_record_name
#       record = dvo.resource_record_value
#       type   = dvo.resource_record_type
#     }
#   }

#   allow_overwrite = true
#   name            = each.value.name
#   records         = [each.value.record]
#   ttl             = 60
#   type            = each.value.type
#   zone_id         = data.aws_route53_zone.this.zone_id
# }

# resource "aws_acm_certificate_validation" "subdomain" {
#   certificate_arn         = aws_acm_certificate.subdomain.arn
#   validation_record_fqdns = [for record in aws_route53_record.subdomain : record.fqdn]
# }
