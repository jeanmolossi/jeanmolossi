locals {
  default_tags = {
    ProjectName = var.project_name
    Repository  = var.repository_source
    Mainteiner  = "Terraform"
  }

  branches = {
    main = {
      stage       = "PRODUCTION"
      sub_domain  = format("%s", var.route53_zone_name)
      branch_name = "main"

      env                          = ""
      DEV_TO_BASE_URL              = ""
      DEV_TO_API_KEY               = ""
      YOUTUBE_API_KEY              = ""
      YOUTUBE_CHAN_ID              = ""
      NEXT_PUBLIC_DEV_TO_BASE_URL  = ""
      NEXT_PUBLIC_GA_TRACKING_ID   = ""
      NEXT_PUBLIC_GTM_TRACKING_TAG = ""
    }
  }
}
