import { datadogRum } from '@datadog/browser-rum';

export function DatadogInit() {
    datadogRum.init({
        applicationId: procss.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID,
        clientToken: procss.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
        // `site` refers to the Datadog site parameter of your organization
        // see https://docs.datadoghq.com/getting_started/site/
        site: procss.env.NEXT_PUBLIC_DATADOG_SITE,
        service: procss.env.NEXT_PUBLIC_DATADOG_SERVICE,
        env: procss.env.NEXT_DATADOG_ENV,
        // Specify a version number to identify the deployed version of your application in Datadog
        // version: '1.0.0',
        sessionSampleRate: 100,
        sessionReplaySampleRate: 100,
        defaultPrivacyLevel: 'mask-user-input',
    });

}


