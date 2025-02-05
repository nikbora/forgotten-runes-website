import { NextApiRequest, NextApiResponse } from "next";
import pinataSDK from "@pinata/sdk";
import { utils } from "ethers";
import { getProvider } from "../../hooks/useProvider";
import { getWizardsContract } from "../../contracts/ForgottenRunesWizardsCultContract";
import replaceAsync from "string-replace-async";
import fs from "fs";
import * as os from "os";

const pinata = pinataSDK(
  process.env.PINATA_ID || "",
  process.env.PINATA_SECRET_KEY || ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404);
  }

  if (!req.body?.signature || !req.body?.wizard_id) {
    return res.status(400).json({
      error:
        "You must supply both a signature and a wizard id that was signed...",
    });
  }

  // console.log("signature", req.body.signature);

  const signingAddress = await utils.verifyMessage(
    req.body.wizard_id,
    req.body.signature
  );

  const wizardContract = getWizardsContract({ provider: getProvider(true) });
  const wizardOwner = await wizardContract.ownerOf(req.body.wizard_id);

  if (wizardOwner !== signingAddress) {
    return res.status(400).json({
      error: `Address ${signingAddress} does not own wizard ${req.body.wizard_id}, ${wizardOwner} does instead.`,
    });
  }

  try {
    // console.log("pinning json");
    const response = await pinata.pinJSONToIPFS({
      name: req.body?.title,
      description: req.body?.story,
      background_color: req.body?.bg_color,
      attributes: [
        { trait_type: "Wizard ID", value: req.body.wizard_id },
        { trait_type: "Creator", value: signingAddress },
      ],
    });
    return res.status(201).json({ hash: response.IpfsHash });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "IPFS upload issue" });
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
