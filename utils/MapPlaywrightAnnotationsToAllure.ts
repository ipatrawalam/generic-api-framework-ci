import { label, severity, feature, story, owner } from 'allure-js-commons';

/**
 * Utility function to map Playwright test.info().annotations to Allure labels.
 * Call this in your test and pass the test object.
 */
export function mapAnnotationsToAllure(test) {
  for (const annotation of test.info().annotations) {
    switch (annotation.type) {
      case 'tag':
        label('tag', annotation.description);
        break;
      case 'severity':
        severity(annotation.description);
        break;
      case 'feature':
        feature(annotation.description);
        break;
      case 'story':
        story(annotation.description);
        break;
      case 'owner':
        owner(annotation.description);
        break;
      default:
        label(annotation.type, annotation.description);
    }
  }
}