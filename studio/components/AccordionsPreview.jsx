import {Flex, Stack, Text} from "@sanity/ui";
import {StackCompactIcon} from "@sanity/icons";

export default function AccordionsPreview(props) {
    const value = props
    return (
        <Flex align={'center'}>
            <Flex width={33} align={'center'}>
                <StackCompactIcon fontSize={'2rem'} />
            </Flex>
            <Stack flex={1} paddingLeft={2} paddingRight={0} space={2}>
                <Text style={{color: 'inherit'}} textOverflow="ellipsis">
                    {value.title}
                </Text>
                {value.accordions && value.accordions.map((accordion, i) => (
                    <Text muted size={1} textOverflow="ellipsis" key={i}>
                        {accordion.title}
                    </Text>
                ))}
            </Stack>
        </Flex>
    )
}