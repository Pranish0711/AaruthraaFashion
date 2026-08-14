export type WhatsAppContext = {
  productName?: string;
  quantity?: string;
  customizationInterest?: boolean;
  customerName?: string;
  page?: "product" | "bulk-quote" | "customize" | "general" | "admin-reply";
};

export function buildWhatsAppUrl(number: string, message: string) {
  const cleanNumber = number.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppMessage(context: WhatsAppContext = {}) {
  const { productName, quantity, customizationInterest, customerName, page } = context;

  if (page === "admin-reply" && customerName) {
    return `Hi ${customerName}, this is AaruthraaFashion. We received your bulk apparel requirement and would like to discuss your customization and quotation.`;
  }

  if (page === "bulk-quote") {
    return "Hi AaruthraaFashion, I am interested in placing a bulk apparel order.";
  }

  if (productName) {
    let message = `Hi AaruthraaFashion, I am interested in the ${productName}. I would like to customize it for a bulk order.`;
    if (quantity) {
      message += ` Quantity: ${quantity}.`;
    }
    if (customizationInterest) {
      message += " I need customization options.";
    }
    return message;
  }

  return "Hi AaruthraaFashion, I am interested in wholesale and custom apparel for my organization.";
}

export function getWhatsAppNumber() {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    process.env.WHATSAPP_NUMBER ??
    "917871317044"
  );
}
