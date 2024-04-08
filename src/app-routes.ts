import type {AppContext} from '~/app-context.types';
import {reqContextMw} from '~/req-context.mw';
import {createPdfRoute} from '~/routes/create-pdf';

export function setupAppRoutes(appContext: AppContext) {
  const {app} = appContext;

  app.use(reqContextMw(appContext));

  app.post('/create-pdf', createPdfRoute(appContext));
}
