export type ProductData = {
  stock: number;
  orderedStock: number;
  price: {
    net: number;
    gross: number;
    taxRate: number;
    currency: string;
  } | null;
  basicPrice: null | number;
  basicPriceQuantity: null | number;
  basicPriceUnit: null | string;
  score: number;
  storeButtonAction: string;
  storeAvailability: {
    color: string;
    minLeadTimeDays: number;
    maxLeadTimeDays: number;
  };
  onlineButtonAction: string;
  onlineAvailability: {
    color: string;
    minLeadTimeDays: number;
    maxLeadTimeDays: number;
  } | null;
  onlineStock: number;
  onlineOrderedStock: number;
  onlineStore: string;
  availableServices: {
    label: string;
    price: null | number;
    icon: string;
    wandaResourceId: null | string;
    bankFinanceId: null | string;
    id: string;
    parentServiceId: null | string;
    tooltipText: string;
    expId: string;
  }[] | null;
  itemOnDisplay: boolean;
  itemOnDisplayDescription: null | string;
  wandaData: null | any; // You can replace 'any' with a more specific type if known
  expertTags: string[] | null;
  priceInclShipping?: number;
  onlineShipment: {
    type: string;
    price: {
      net: number;
      gross: number;
      taxRate: number;
      currency: string;
    };
    hideVskText: boolean;
  }[];
  showStoreName: null | string;
};
