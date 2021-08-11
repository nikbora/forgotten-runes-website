import Layout from "../components/Layout";
import dynamic from "next/dynamic";

const WizardMap = dynamic(() => import("../components/Lore/WizardMap"), {
  ssr: false,
});

const WizardMapLeaflet = dynamic(
  () => import("../components/Lore/WizarMapLeaflet"),
  { ssr: false }
);

const WizardGalleryPage = () => {
  return (
    <Layout title="Forgotten Runes Wizard's Cult: 10,000 on-chain Wizard NFTs">
      <WizardMap />
      {/*<WizardMapLeaflet/>*/}
    </Layout>
  );
};

export default WizardGalleryPage;
