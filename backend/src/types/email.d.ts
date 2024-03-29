type VExchangeRate = DExchangeRate;

interface VMensaLink {
  jumpLink: string;
  mensaName: string;
}

interface VMensaMenu {
  mensaName: string;
  jumpLinkId: string;
  mensaMenu: string;
}

interface VEmailProps {
  email: string;
  exchangeRates: VExchangeRate[];
  mensaMenus: VMensaMenu[];
  versionNumber: string;
  rootUrl: string | undefined;
  frontendUrl: string | undefined;
}
