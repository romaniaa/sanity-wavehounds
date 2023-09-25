import {Box, Flex, Stack, Text} from "@sanity/ui";
import {BlockContentIcon, WarningOutlineIcon} from "@sanity/icons";

export default function ContentPreview(props) {
    const value = props

        const colors = {
            'white': '#fff',
            'black': '#000',
            'teal': '#FF6600'
        }
        const outline = value.background !== 'white'
            ? `${colors[value.background]} solid 2px`
            : 'none'

        if (!value.content || value.content?.length === 0) {
            return (
                <Flex align={'center'}>
                    <Flex width={33} align={'center'}>
                        <WarningOutlineIcon fontSize={'2rem'} />
                    </Flex>
                    <Box paddingLeft={2}>Empty content block</Box>
                </Flex>
            )
        }

        return (
            <Flex align={'center'}>
                <Flex width={33} align={'center'}>
                    <BlockContentIcon fontSize={'2rem'} />
                </Flex>
                <Stack flex={1} padding={2} space={3} style={{outline, borderRadius: '4px'}}>
                    {value.content && value.content.map((block, i) => {
                         if (block._type === 'block' && block.children) {
                             return <Text key={i} size={block.style === 'normal' ? 1 : 2} muted={block.style === 'normal'} textOverflow="ellipsis">{block.children.map(child => child.text).join('')}</Text>
                         }
                    })}
                </Stack>
            </Flex>
        )
}