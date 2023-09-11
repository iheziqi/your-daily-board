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
  exchangeRates: VExchangeRate[];
  mensaMenus: VMensaMenu[];
  versionNumber: string;
}
