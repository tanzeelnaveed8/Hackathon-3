export interface Product {
   
    _id: string;
    productName: string;
    type : "product";
    price: number;
    inventory: number;
    colors: string[];
    status: string;
    image: {
      asset: {
        url: string | undefined;
        _ref: string;
        _type: string;
      };
    };
    description: string;
  }
  