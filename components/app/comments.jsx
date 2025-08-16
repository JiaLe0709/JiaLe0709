import Config from '@/app.config';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

const GiscusComment = () => {
    const { resolvedTheme } = useTheme();
    const lang = 'en'
    const initialGiscusTheme = resolvedTheme === 'light' ? 'noborder_light' : 'noborder_gray';

    return (
        <>
            <div
                id='comments'
                className={'w-full'}
            >
                <Giscus
                    id="comments"
                    repo={Config.giscusConfig.repo}
                    repoId={Config.giscusConfig.repoId}
                    category={Config.giscusConfig.category}
                    categoryId={Config.giscusConfig.categoryId}
                    mapping="title"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={initialGiscusTheme}
                    lang={lang}
                    //loading="lazy"
                />
            </div>
        </>
    );
};

export default GiscusComment;