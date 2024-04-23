import HeroHeaderAndImage, { type HeroHeaderAndImageTypes, HeroHeaderAndImage_Query } from './global/HeroHeaderAndImage';
import FlexTiles, { type FlexTilesTypes, FlexTiles_Query } from './global/FlexTiles';
import AboutSection, { type AboutSectionTypes, AboutSection_Query } from './global/AboutSection';
import SimpleStats, { type SimpleStatsTypes, SimpleStats_Query } from './global/SimpleStats';
import Partners, { type PartnersTypes, Partners_Query } from './global/Partners';
import Faq, { type FaqTypes, Faq_Query } from './global/Faq';

type componentsMapTypes = {
  HeroHeaderAndImage: HeroHeaderAndImageTypes;
  FlexTiles: FlexTilesTypes;
  AboutSection: AboutSectionTypes;
  SimpleStats: SimpleStatsTypes;
  Partners: PartnersTypes;
  Faq: FaqTypes;
};

export type ComponentTypes = componentsMapTypes[keyof componentsMapTypes] & { _type: string };

export default function Components({ data }: { data: ComponentTypes[] }) {
  return data?.map((item, index) => {
    const componentType = item._type as keyof componentsMapTypes;
    const componentsMapTypes: Record<string, React.ReactNode> = {
      HeroHeaderAndImage: <HeroHeaderAndImage {...(item as HeroHeaderAndImageTypes)} index={index} />,
      FlexTiles: <FlexTiles {...(item as FlexTilesTypes)} />,
      AboutSection: <AboutSection {...(item as AboutSectionTypes)} />,
      SimpleStats: <SimpleStats {...(item as SimpleStatsTypes)} />,
      Partners: <Partners {...(item as PartnersTypes)} />,
      Faq: <Faq {...(item as FaqTypes)} />,
    };
    const DynamicComponent = componentsMapTypes[componentType];
    if (!DynamicComponent) return null;
    return componentsMapTypes[componentType];
  });
}

export const Components_Query = /* groq */ `
  content[] {
    _type,
    ${HeroHeaderAndImage_Query}
    ${FlexTiles_Query}
    ${AboutSection_Query}
    ${SimpleStats_Query}
    ${Partners_Query}
    ${Faq_Query}
  },
`;
