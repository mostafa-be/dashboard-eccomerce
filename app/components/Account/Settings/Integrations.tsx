import React from "react";
import {
  Card,
  CardContent,
  HeaderCard,
  TitleCard,
  CardFooter,
} from "../../ui/card";

/**
 * Integrations Component
 * Displays a list of integrations and their connection status.
 * Each integration shows a button to connect or disconnect.
 */
type Props = {
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  settings?: {
    integrations?: {
      googleConnected?: boolean;
      amazonConnected?: boolean;
      facebookConnected?: boolean;
      githubConnected?: boolean;
      dropboxConnected?: boolean;
      jiraConnected?: boolean;
      slackConnected?: boolean;
      notionConnected?: boolean;
      zapierConnected?: boolean;
      trelloConnected?: boolean;
      asanaConnected?: boolean;
      mondayConnected?: boolean;
      shopifyConnected?: boolean;
      quickbooksConnected?: boolean;
      stripeConnected?: boolean;
      paypalConnected?: boolean;
      [key: string]: any;
    };
  };
};

const INTEGRATION_LIST = [
  { key: "googleConnected", label: "Google" },
  { key: "amazonConnected", label: "Amazon" },
  { key: "facebookConnected", label: "Facebook" },
  { key: "githubConnected", label: "GitHub" },
  { key: "dropboxConnected", label: "Dropbox" },
  { key: "jiraConnected", label: "Jira" },
  { key: "slackConnected", label: "Slack" },
  { key: "notionConnected", label: "Notion" },
  { key: "zapierConnected", label: "Zapier" },
  { key: "trelloConnected", label: "Trello" },
  { key: "asanaConnected", label: "Asana" },
  { key: "mondayConnected", label: "Monday" },
  { key: "shopifyConnected", label: "Shopify" },
  { key: "quickbooksConnected", label: "QuickBooks" },
  { key: "stripeConnected", label: "Stripe" },
  { key: "paypalConnected", label: "PayPal" },
];

const Integrations = ({ sectionRefs, settings }: Props) => (
  <Card
    ref={(el) =>
      (sectionRefs.current["integrations"] = el as HTMLDivElement | null)
    }
    id="integrations"
    className="mb-16 scroll-mt-32 bg-white dark:bg-black-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow p-4 sm:p-6 md:p-8 w-full mx-auto"
  >
    <HeaderCard>
      <TitleCard
        title="Integrations"
        className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4"
      />
    </HeaderCard>
    <CardContent>
      <div className="flex flex-col space-y-4">
        {INTEGRATION_LIST.map((integration) => {
          const connected = !!settings?.integrations?.[integration.key];
          return (
            <div className="flex items-center gap-2" key={integration.key}>
              <span className="text-gray-700 dark:text-gray-300">
                {integration.label}
              </span>
              <span
                className={`ml-auto text-xs font-semibold ${
                  connected ? "text-green-600" : "text-gray-400"
                }`}
              >
                {connected ? "Connected" : "Not Connected"}
              </span>
              <button
                type="button"
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  connected
                    ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                }`}
                // Replace with actual connect/disconnect logic
                onClick={() => {
                  // handleConnectOrDisconnect(integration.key)
                }}
              >
                {connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>
    </CardContent>
    <CardFooter />
  </Card>
);

export default Integrations;
