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
  mensaLinks: VMensaLink[];
  mensaMenus: VMensaMenu[];
  versionNumber: string;
}
