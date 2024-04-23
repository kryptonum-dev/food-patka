import HeroHeaderAndImage, { type HeroHeaderAndImageTypes, HeroHeaderAndImage_Query } from './global/HeroHeaderAndImage';
import FlexTiles, { type FlexTilesTypes, FlexTiles_Query } from './global/FlexTiles';
import AboutSection, { type AboutSectionTypes, AboutSection_Query } from './global/AboutSection';

type componentsMapTypes = {
  HeroHeaderAndImage: HeroHeaderAndImageTypes;
  FlexTiles: FlexTilesTypes;
  AboutSection: AboutSectionTypes;
};

export type ComponentTypes = componentsMapTypes[keyof componentsMapTypes] & { _type: string };

export default function Components({ data }: { data: ComponentTypes[] }) {
  return data?.map((item, index) => {
    const componentType = item._type as keyof componentsMapTypes;
    const componentsMapTypes: Record<string, React.ReactNode> = {
      HeroHeaderAndImage: <HeroHeaderAndImage {...(item as HeroHeaderAndImageTypes)} index={index} />,
      FlexTiles: <FlexTiles {...(item as FlexTilesTypes)} />,
      AboutSection: <AboutSection {...(item as AboutSectionTypes)} />,
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
  },
`;
