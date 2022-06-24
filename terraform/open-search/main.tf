terraform {
  required_version = "1.1.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.9.0"
    }
  }

  backend "s3" {
    key     = "open-search/terraform.tfstate"
    encrypt = false
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_opensearch_domain" "obs" {
  domain_name    = "kibana-${var.project_name}"
  engine_version = "OpenSearch_1.2"

  cluster_config {
    instance_type = "t3.small.search"
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 16
  }

  domain_endpoint_options {
    custom_endpoint_certificate_arn = data.aws_acm_certificate.this.arn
    custom_endpoint_enabled         = true
    custom_endpoint                 = "kibana.${var.route53_zone_name}"

    enforce_https       = true
    tls_security_policy = "Policy-Min-TLS-1-2-2019-07"
  }

  advanced_security_options {
    enabled                        = true
    internal_user_database_enabled = true

    master_user_options {
      master_user_name     = "admin"
      master_user_password = var.kibana_password
    }
  }

  node_to_node_encryption {
    enabled = true
  }

  encrypt_at_rest {
    enabled    = true
    kms_key_id = var.encrypt_kms_key_id
  }

  access_policies = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "es:*",
      "Principal": "*",
      "Effect": "Allow",
      "Resource": "arn:aws:es:${var.region}:${data.aws_caller_identity.current.account_id}:domain/kibana-${var.project_name}/*"
    }
  ]
}
POLICY

  tags = merge(
    local.default_tags,
    { Name = format("open-search-%s", var.project_name) }
  )
}

resource "aws_route53_record" "domain" {
  name    = format("kibana.%s", var.route53_zone_name)
  type    = "CNAME"
  zone_id = data.aws_route53_zone.this.id
  ttl     = "300"
  records = [
    aws_opensearch_domain.obs.kibana_endpoint
  ]
}
