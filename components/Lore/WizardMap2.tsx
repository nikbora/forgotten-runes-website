import React from "react";
import {Box} from "rebass";
import Image from 'next/image'



const WizardMap2 = () => {

    return <Box sx={{
        display: 'grid',
        gridGap: 0,
        gridTemplateColumns: 'repeat(auto-fit, 400px)',
        gridAutoFlow: 'row'
    }} maxWidth={"100%"}>
        <Box>
            <Image src="https://nftz.forgottenrunes.com/wizards/alt/400-nobg/wizard-1029.png" alt="Picture of the author" width={400} height={400} />

        </Box>
        <Box>
            <Image src="https://nftz.forgottenrunes.com/wizards/alt/400-nobg/wizard-1029.png" alt="Picture of the author" width={400} height={400} />

        </Box>
        <Box>
            <Image src="https://nftz.forgottenrunes.com/wizards/alt/400-nobg/wizard-1029.png" alt="Picture of the author" width={400} height={400} />

        </Box>
        <Box>
            <Image src="https://nftz.forgottenrunes.com/wizards/alt/400-nobg/wizard-1029.png" alt="Picture of the author" width={400} height={400} />

        </Box>
        <Box>
            <Image src="https://nftz.forgottenrunes.com/wizards/alt/400-nobg/wizard-1029.png" alt="Picture of the author" width={400} height={400} />

        </Box>
    </Box>
}

export default WizardMap2;