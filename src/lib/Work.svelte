<script>
    let data = $props()
    const { 
        setting, 
        drafts,
        history
    } = data
    const draft_highlight = (draft) => draft.active || ""
    const excerpt = (chapter) => chapter.split(/\n+/)
    const change_data = (data) => {
        if (data.id)
            delete data.id
        return Object.keys(data).map(key => `key=${data[key]}`).join(", ")
    }
</script>


<article>
    <section>
        <div class="setting-banner">
            <span>setting: {setting.scale}</span>
            <h3>{ setting.name }</h3>
        </div>
        <p>{setting.description}</p>
        <div class="list bottom-scroll">
            {#each setting.notes as note}
            <div id={note.id}>
                <p>{note.txt}</p>
                {#if note.links}
                <ul>
                    {#each note.links as link}
                    <li><a 
                        href={link[1]} 
                        target="_blank"
                    >{link[0]}</a></li>
                    {/each}
                </ul>
                {/if}
            </div>
            {/each}
        </div>
    </section>
    <section>
        <h3>Drafts</h3>
        <div class="list side-scroll">
            {#each drafts as draft}
            <div class={draft_highlight(draft)}>
                <div class="draft-description">
                    {draft.description}
                </div>
                {#each draft.chapters as chapter}
                <div class="chapter-item">
                    <h4>{chapter.title}</h4>
                    {#each excerpt(chapter.excerpt) as pgh}
                    <p>{pgh}</p>
                    {/each}
                </div>
                {/each}
            </div>
            {/each}
        </div>
    </section>
    <section>

    </section>
    <section>
        <h3>History</h3>
        <div class="list bottom-scroll">
            {#each history as change}
            {@const { cond, src, from, to, res } = change}
            <div id={change.id}>
                <h4>{change.action}</h4>
                <ul class="props-list">
                    {#if cond}
                    <li>conditions: {change_data(cond)}</li>
                    {/if}
                    {#if src} 
                    <li>branches from: {change_data(src)}</li>
                    {/if}
                    {#if from}
                    <li>from: {change_data(from)}</li>
                    {/if}
                    {#if to}
                    <li>into: {change_data(to)}</li>
                    {/if}
                    {#if res}
                    <li>creating: {change_data(res)}</li>
                    {/if}
                </ul>
            </div>
            {/each}
        </div>
    </section>
    <!--
    - id
    - title
    - current: draft_id
    - drafts: [draft_id]
    - setting: setting_id
    - timelines: [timeline_id]
    - profiles: [profile_id]
    - languages: [language_id]
    - maps: [map_id]
    - history: history_id
    - journal: journal_id
    -->
</article>

<style>
</style>
