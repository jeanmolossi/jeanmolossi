import { RenderIf } from "@/presentation/helpers";

interface TagListProps {
    tagList?: string;
}

export const TagList = ({ tagList = '' }: TagListProps) => {
    const tags = tagList.split(', ').filter(Boolean).map((tag) => (
        <a
            href={`${process.env.NEXT_PUBLIC_DEV_TO_BASE_URL}/t/${tag}`}
            key={tag}
            target="_blank"
        >
            #{tag}
        </a>
    ));

    return (
        <RenderIf condition={tags.length > 0}>
            {tags}
        </RenderIf>
    )
}
