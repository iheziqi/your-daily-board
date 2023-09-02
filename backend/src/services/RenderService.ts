import * as ejs from 'ejs';
import {readFileSync} from 'fs';
import {
  SubscriptionRepository,
  MensaInfoRepository,
} from '../repositories/index';
import {Knex} from 'knex';

/**
 * Service for rendering email template.
 */
class RenderService {
  /** the path of email template folder. */
  private templatesPath: string;
  /** Repositories. */
  private subscriptionRepo: SubscriptionRepository;
  private mensaInfoRepo: MensaInfoRepository;

  constructor(templatesPath: string, knexInstance: Knex) {
    this.templatesPath = templatesPath;
    this.subscriptionRepo = new SubscriptionRepository(knexInstance);
    this.mensaInfoRepo = new MensaInfoRepository(knexInstance);
  }

  /**
   * Renders your daily board email template for given user.
   * @param userEmail The email address of user
   * @param versionNumber The version number of the application
   * @returns Rendered html email string
   */
  public async renderYourDailyBoardEmailForUser(
    userEmail: string,
    versionNumber: string
  ): Promise<string> {
    try {
      // Gets all user subscribed exchange rates.
      const exchangeRates =
        await this.subscriptionRepo.getUserSubscribedExchangeRates(userEmail);
      // Gets all user subscribed mensa menus.
      const mensaMenus = await this.getUserMensaMenus(userEmail);

      // Put together email props for email template.
      const emailProps: VEmailProps = {
        exchangeRates,
        mensaMenus,
        versionNumber,
      };

      return this.renderTemplate('boardSkeleton', emailProps);
    } catch (error) {
      console.error('Error rendering email:', error);
      throw new Error(
        'An error occurred while rendering your daily board email.'
      );
    }
  }

  /**
   * Renders the email template with given data.
   * @param templateName The name of template file.
   * @param data The data will be displayed in email.
   * @returns Rendered html email string.
   */
  private renderTemplate(templateName: string, data: VEmailProps): string {
    try {
      const templateFilePath = `${this.templatesPath}/${templateName}.ejs`;
      const templateContent = readFileSync(templateFilePath, 'utf-8');
      const renderedContent = ejs.render(templateContent, data, {
        root: this.templatesPath,
      });
      return renderedContent;
    } catch (error) {
      throw new Error(
        `An error occurred while rendering template ${templateName}: ${error}`
      );
    }
  }

  /**
   * Gets all mensa menu subscriptions of the given user.
   * @param userEmail The email address of user
   * @returns
   */
  protected async getUserMensaMenus(userEmail: string): Promise<VMensaMenu[]> {
    // Gets today's menus of based on user's subscription.
    const userSubscribedMensaMenus =
      await this.subscriptionRepo.getUserSubscribedMensaMenusOfToday(userEmail);

    if (userSubscribedMensaMenus.length === 0) {
      return [];
    }

    const mensaMenus: VMensaMenu[] = [];

    // Constructs data needed in email template.
    for (const subscribedMenu of userSubscribedMensaMenus) {
      // needs the name of mensa here.
      const mensaInfo = await this.mensaInfoRepo.getMensaInfoById(
        subscribedMenu.mensa_id
      );

      if (mensaInfo && subscribedMenu.menu) {
        mensaMenus.push({
          mensaName: mensaInfo.name,
          mensaMenu: subscribedMenu.menu,
          jumpLinkId: subscribedMenu.mensa_id,
        });
      } else if (mensaInfo && !subscribedMenu.menu) {
        // If there is no menu today, give a message for users.
        mensaMenus.push({
          mensaName: mensaInfo.name,
          mensaMenu:
            'No menu today or closed. Please go to the website of StudierendenWerk for more information.',
          jumpLinkId: subscribedMenu.mensa_id,
        });
      }
    }

    return mensaMenus;
  }
}

export default RenderService;
