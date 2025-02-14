export interface AddressDetailDto {
    Id: number;
    ShipToAccountName: string | null;
    DeliveryAddress: string | null;
    Street: string | null;
    PostalCode: string | null;
    City: string | null;
    CountryId: number | null;
    CountryName: string | null;
    IsDefault: boolean;
    StateOrProvince: string | null;
    SiteMdcpOrgId: string | null;
    SiteIdNumber: string | null;
}

export interface ProductHomeDto {
    Id: number;
    Name: string | null;
    Price: number | null;
    Description: string | null;
    ImageURL: string | null;
    IsFeatured: string | null; 
}

export interface ProductDetailDto {
    Id: number;
    Guid: string | null;
    Name: string | null;
    Color: string | null;
    Price: number | null;
    Size: string | null;
    Description: string | null;
    ImageURL: string | null;
    IsFeatured: string | null;
}

export interface ProductDto {
    Id: number;
    Guid: string | null;
    Name: string | null;
    Color: string | null;
    Price: number | null;
    Size: string | null;
    Description: string | null;
    ImageURL: string | null;
    IsFeatured: string | null;
}


export interface TokenPayload {
    email: string;
    role: string; 
}