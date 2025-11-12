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
  // list_barber_shops tool
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

  /**
   * 1. User ask ChatGPT about property closing in Ontario -> prompt: "I’m about to buy a house in sudbury. I need a lawyer to do the closing. How does this work? where do i go?"
   * 2. "Start your closing" CTA -> tap or accept by messaging
   * 3. Five step form: -> submit step or respond by messaging
   *    1. Transaction type (purchase or sale)
   *    2. Transaction amount (input price)
   *    3. Property address (input address)
   *    4. Agreement status (signed or not)
   *    5. Contact information (full name, email, phone -required-, co-purchasers -optional, up to 5-)
   * 4. Trigger inquiry creation
   * 5. Confirmation message and URL to view the inquiry
   */

  // display_property_closing_service tool
  const propertyClosingServiceHtml = await getAppsSdkCompatibleHtml(
    baseURL,
    "/property-closing/display-service"
  );

  const propertyClosingServiceWidget: ContentWidget = {
    id: "display_property_closing_service",
    title: "Property Closing Service",
    templateUri: "ui://widget/property-closing-service.html",
    invoking: "Loading property closing service...",
    invoked: "Property closing service loaded",
    html: propertyClosingServiceHtml,
    description: "Use this when user asks for a property closing service.",
    widgetDomain: baseURL,
  };

  server.registerResource(
    "property-closing-service-widget",
    propertyClosingServiceWidget.templateUri,
    {
      title: propertyClosingServiceWidget.title,
      description: propertyClosingServiceWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": propertyClosingServiceWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${propertyClosingServiceWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription":
              propertyClosingServiceWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": propertyClosingServiceWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    propertyClosingServiceWidget.id,
    {
      title: propertyClosingServiceWidget.title,
      description: "Use this when user asks for a property closing service.",
      inputSchema: {},
      _meta: widgetMeta(propertyClosingServiceWidget),
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "Here is the property closing service. Click on the 'Start your closing' button to start the property closing service.",
          },
        ],
        structuredContent: {
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(propertyClosingServiceWidget),
      };
    }
  );
});

export const GET = handler;
export const POST = handler;
