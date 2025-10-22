import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  description: string;
  widgetDomain: string;
};

function widgetMeta(widget: ContentWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

const handler = createMcpHandler(async (server) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/");

  const barberShopWidget: ContentWidget = {
    id: "list_barber_shops",
    title: "Barber Shop Booking",
    templateUri: "ui://widget/barber-shops.html",
    invoking: "Loading nearby barber shops...",
    invoked: "Barber shops loaded",
    html: html,
    description: "Browse and book appointments at nearby barber shops",
    widgetDomain: baseURL,
  };

  server.registerResource(
    "barber-shop-widget",
    barberShopWidget.templateUri,
    {
      title: barberShopWidget.title,
      description: barberShopWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": barberShopWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${barberShopWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": barberShopWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": barberShopWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    barberShopWidget.id,
    {
      title: barberShopWidget.title,
      description:
        "Show nearby barber shops where users can view available time slots and book appointments. Useful when user asks to find barbers, book haircuts, or see available appointments.",
      inputSchema: {},
      _meta: widgetMeta(barberShopWidget),
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "Here are the available barber shops nearby. Click on any shop to view available time slots and book an appointment.",
          },
        ],
        structuredContent: {
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(barberShopWidget),
      };
    }
  );
});

export const GET = handler;
export const POST = handler;
