import { warning } from '@actions/core';
import { IssueMetadata } from './schema';

export function escape(str: string): string {
  return str.replace('|', '\\|');
}

export function getMetadataFromMessage(message: string) {
  const regexp = new RegExp(`^<!-- (\\S+) = (.*) -->$`, 'gm');
  let result: IssueMetadata[] = [];

  const match = [...message.matchAll(regexp)];

  match.forEach(item => {
    if (item && Array.isArray(item) && item.length > 2) {
      try {
        const data = JSON.parse(item[2]);
        result.push({ [item[1]]: data });
      } catch (e) {
        warning(`Error parsing metadata from message: ${e}`);
      }
    }
  });

  return result;
}
