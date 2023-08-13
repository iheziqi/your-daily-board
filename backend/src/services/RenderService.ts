import * as ejs from 'ejs';
import {readFileSync} from 'fs'; // Import promises version of fs.readFile

/**
 * Service for rendering email template.
 */
class RenderService {
  /** the path of email template folder. */
  private templatesPath: string;

  constructor(templatesPath: string) {
    this.templatesPath = templatesPath;
  }

  /**
   * Renders the email template with given data.
   * @param templateName The name of template file.
   * @param data The data will be displayed in email.
   * @returns Rendered html email string.
   */
  public renderTemplate(templateName: string, data: VEmailProps): string {
    try {
      const templateFilePath = `${this.templatesPath}/${templateName}.ejs`;
      const templateContent = readFileSync(templateFilePath, 'utf-8');
      const renderedContent = ejs.render(templateContent, data, {
        root: this.templatesPath,
      });
      return renderedContent;
    } catch (error) {
      throw new Error(`Error rendering template ${templateName}: ${error}`);
    }
  }
}

export default RenderService;
