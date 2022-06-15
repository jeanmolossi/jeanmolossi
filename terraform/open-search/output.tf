output "aws_opensearch_domain" {
  value       = aws_opensearch_domain.obs.domain_name
  description = "OpenSearch domain name"
}
