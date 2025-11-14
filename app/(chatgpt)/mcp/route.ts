import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import {
  determineStep,
  getStepMessage,
  type InquiryData,
} from "@/lib/inquiry-helpers";

const inquiryInputSchema = z.object({
  transactionType: z.enum(["purchase", "sale"]).optional(),
  transactionAmount: z.number().optional(),
  propertyAddress: z.string().optional(),
  agreementSigned: z.boolean().optional(),
  contactInfo: z
    .object({
      fullName: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
});

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
    id: "display_property_closing_service_information",
    title: "Property Closing Service Information",
    templateUri: "ui://widget/property-closing-service.html",
    invoking: "Loading property closing service information...",
    invoked: "Property closing service information loaded",
    html: propertyClosingServiceHtml,
    description:
      "Use this when user asks information about property closing services.",
    widgetDomain: baseURL,
  };

  server.registerResource(
    "property-closing-service-information-widget",
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
      description:
        "Use this when user asks information about property closing services.",
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

  // start_property_closing_inquiry tool
  const startPropertyClosingInquiryHtml = await getAppsSdkCompatibleHtml(
    baseURL,
    "/property-closing/start-inquiry"
  );

  const startPropertyClosingInquiryWidget: ContentWidget = {
    id: "start_property_closing_inquiry",
    title: "Start Property Closing Inquiry",
    templateUri: "ui://widget/start-property-closing-inquiry.html",
    invoking: "Loading start property closing inquiry...",
    invoked: "Start property closing inquiry loaded",
    html: startPropertyClosingInquiryHtml,
    description: "Use this when user asks to start a property closing inquiry.",
    widgetDomain: baseURL,
  };

  server.registerResource(
    "start-property-closing-inquiry-widget",
    startPropertyClosingInquiryWidget.templateUri,
    {
      title: startPropertyClosingInquiryWidget.title,
      description: startPropertyClosingInquiryWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription":
          startPropertyClosingInquiryWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${startPropertyClosingInquiryWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription":
              startPropertyClosingInquiryWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain":
              startPropertyClosingInquiryWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    startPropertyClosingInquiryWidget.id,
    {
      title: startPropertyClosingInquiryWidget.title,
      description:
        "Use this when user asks to start a property closing inquiry or provides information for a property closing inquiry. Accepts optional parameters to pre-fill fields based on conversation context.",
      inputSchema: inquiryInputSchema as any,
      _meta: widgetMeta(startPropertyClosingInquiryWidget),
    },
    async (extra: any) => {
      const args = extra.params as z.infer<typeof inquiryInputSchema>;
      const inquiryData: Partial<InquiryData> = {
        transactionType: args?.transactionType,
        transactionAmount: args?.transactionAmount,
        propertyAddress: args?.propertyAddress,
        agreementSigned: args?.agreementSigned,
        contactInfo: args?.contactInfo,
      };

      const currentStep = determineStep(inquiryData);
      const message = getStepMessage(currentStep, inquiryData);

      return {
        content: [
          {
            type: "text" as const,
            text: message,
          },
        ],
        structuredContent: {
          step: currentStep,
          inquiryData: inquiryData,
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(startPropertyClosingInquiryWidget),
      };
    }
  );
});

export const GET = handler;
export const POST = handler;
