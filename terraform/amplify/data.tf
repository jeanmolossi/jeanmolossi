data "aws_iam_role" "amplifyconsole" {
  name = "amplifyconsole-backend-role"
}

data "aws_cloudfront_distribution" "amplify_cloudfront_id" {
  id = var.amplify_cloudfront_id
}
