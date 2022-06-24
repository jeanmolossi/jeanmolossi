import Script from "next/script";

export function AwsRum() {
    return (
        <Script
            id="aws-rum"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                (function(n,i,v,r,s,c,x,z){x=window.AwsRumClient={q:[],n:n,i:i,v:v,r:r,c:c};window[n]=function(c,p){x.q.push({c:c,p:p});};z=document.createElement('script');z.async=true;z.src=s;document.head.insertBefore(z,document.head.getElementsByTagName('script')[0]);})(
                    'cwr',
                    'e7de53ee-fdf0-4d99-8887-5b7ed9cb8d55',
                    '1.0.0',
                    'us-east-1',
                    'https://client.rum.us-east-1.amazonaws.com/1.5.x/cwr.js',
                    {
                      sessionSampleRate: 1,
                      guestRoleArn: "arn:aws:iam::599981017555:role/RUM-Monitor-us-east-1-599981017555-3882169406561-Unauth",
                      identityPoolId: "us-east-1:d29e3e27-73be-442e-af64-42a0c8a4bf94",
                      endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
                      telemetries: ["performance","errors","http"],
                      allowCookies: true,
                      enableXRay: false
                    }
                  );
                `,
            }}
        />
    )
}
