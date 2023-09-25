import {Box, Flex, Stack, Text} from "@sanity/ui";
import {WarningOutlineIcon} from "@sanity/icons";

export default function ColumnImagesPreview(props) {
    const value = props

    if (value?.image_one && value?.image_two) {

        return (
            <Stack space={2}>
                <Flex align={'center'}>
                    <Flex style={{ width: '35px', height: '35px', borderRadius:'3px', position: 'relative', overflow: 'hidden' }} align={'center'}>
                        <img src={value.image_one + '?w=35&h=35&fit=crop&q=85'} style={{ width: '100%' }} alt=" "/>
                        <span style={{ position: 'absolute', width: '100%', height: '100%', boxShadow: `inset 0 0 0 1px var(--card-fg-color)`, borderRadius: 'inherit', opacity: '0.2' }}></span>
                    </Flex>
                    <Stack flex={1} paddingLeft={2} paddingRight={0} space={2}>
                        <Text style={{color: 'inherit'}} textOverflow="ellipsis">
                            {value.caption_one || 'Left Image'}
                        </Text>
                    </Stack>
                </Flex>
                <Flex align={'center'}>
                    <Flex style={{ width: '35px', height: '35px', borderRadius:'3px', position: 'relative', overflow: 'hidden' }} align={'center'}>
                        <img src={value.image_two + '?w=35&h=35&fit=crop&q=85'} style={{ width: '100%' }} alt=" "/>
                        <span style={{ position: 'absolute', width: '100%', height: '100%', boxShadow: `inset 0 0 0 1px var(--card-fg-color)`, borderRadius: 'inherit', opacity: '0.2' }}></span>
                    </Flex>
                    <Stack flex={1} paddingLeft={2} paddingRight={0} space={2}>
                        <Text style={{color: 'inherit'}} textOverflow="ellipsis">
                            {value.caption_two || 'Right Image'}
                        </Text>
                    </Stack>
                </Flex>
            </Stack>
        )
    }
    return (
        <Flex align={'center'}>
            <Flex width={33} align={'center'}>
                <WarningOutlineIcon fontSize={'2rem'} />
            </Flex>
            <Box paddingLeft={2}>Empty images block</Box>
        </Flex>
    )
}