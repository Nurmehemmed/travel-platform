import type { LanguageCode } from "../../i18n";
import type { NavExtraTranslations } from "./types";

export const NAV_EXTRA_TRANSLATIONS: Record<LanguageCode, NavExtraTranslations> = {
  EN: {
    trackTransfer: "Track Transfer",
    bookTransfer: "Book Transfer",
    trackVisa: "Track Application",
    applyVisa: "Apply Online",
  },
  AZ: {
    trackTransfer: "Transferi İzlə",
    bookTransfer: "Transfer Sifariş Et",
    trackVisa: "Statusu Yoxla",
    applyVisa: "Onlayn Müraciət",
  },
  RU: {
    trackTransfer: "Отследить трансфер",
    bookTransfer: "Заказать трансфер",
    trackVisa: "Проверить визу",
    applyVisa: "Подать заявку",
  },
  FR: {
    trackTransfer: "Suivre le transfert",
    bookTransfer: "Réserver un transfert",
    trackVisa: "Suivi de visa",
    applyVisa: "Demande en ligne",
  },
  AR: {
    trackTransfer: "تتبع التوصيل",
    bookTransfer: "حجز التوصيل",
    trackVisa: "متابعة التأشيرة",
    applyVisa: "التقديم أونلاين",
  },
  DE: {
    trackTransfer: "Transfer verfolgen",
    bookTransfer: "Transfer buchen",
    trackVisa: "Visum-Status",
    applyVisa: "Online beantragen",
  },
};
