import Layout from "../components/Layout";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";

import React from "react";


const WizardMap = dynamic(
    () => import("../components/Lore/WizardMap"),
    { ssr: false }
)


const LoreWrapper = styled.div`
  padding: 1em;
`;

const LorePage = () => (
  <Layout title="wtf | Forgotten Runes Wizard's Cult: 10,000 on-chain Wizard NFTs">
    <LoreWrapper>
    </LoreWrapper>
    <WizardMap/>
  </Layout>
);

export default LorePage;
