output "aws_amplify_prod_domain" {
  value       = aws_amplify_domain_association.this["main"].domain_name
  description = "The Domain of the Amplify App"
}

# output "aws_amplify_dev_domain" {
#   value       = aws_amplify_domain_association.this["develop"].domain_name
#   description = "The SubDomain of the Amplify App"
# }

output "aws_amplify_prod_subdomain" {
  value       = aws_amplify_domain_association.this["main"].sub_domain
  description = "The SubDomain of the Amplify App"
}

output "aws_amplify_prod_webhook" {
  value       = aws_amplify_webhook.master["main"].url
  description = "The Webhook of the Amplify App"
}
