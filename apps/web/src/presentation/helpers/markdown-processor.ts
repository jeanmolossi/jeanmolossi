export class MarkdownProcessor {
    constructor(private markdown: string) {}

    extractEmbed() {
        const regexp = /({%\sembed\s)(.*)(\s%})/gi;
        this.markdown = this.markdown.replace(regexp, '');
        return this;
    }

    extractEmptyCodeBlock() {
        const regexp = /(\`\`\`[\s\d]+)\s*(\`\`\`)/gi;
        this.markdown = this.markdown.replace(regexp, '');
        return this;
    }

    final() {
        return this.markdown;
    }
}
