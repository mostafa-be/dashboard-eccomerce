import React from "react";

/**
 * Safely transforms placeholders in translated text to React elements
 * This works for both LTR and RTL languages (like Arabic)
 *
 * @param message The translated message with placeholders
 * @param components Object mapping placeholder names to React components
 * @returns React element with proper interpolation
 */
export function interpolateComponents(
  message: string,
  components: Record<string, React.ReactNode>
): React.ReactNode[] {
  // Handle cases where the message is undefined or null
  if (!message) {
    return null;
  }

  // Pattern to match placeholders like {componentName}
  const pattern = /\{([^}]+)\}/g;
  let match;
  let lastIndex = 0;
  const result: React.ReactNode[] = [];

  // Find all placeholders and replace them with components
  while ((match = pattern.exec(message)) !== null) {
    const [fullMatch, componentKey] = match;
    const componentToInsert = components[componentKey];

    // Add text before the placeholder
    if (match.index > lastIndex) {
      result.push(message.substring(lastIndex, match.index));
    }

    // Add the component if it exists, otherwise add the original placeholder
    if (componentToInsert) {
      result.push(
        React.cloneElement(componentToInsert as React.ReactElement, {
          key: `component-${result.length}`,
        })
      );
    } else {
      result.push(fullMatch);
    }

    lastIndex = match.index + fullMatch.length;
  }

  // Add any remaining text after the last placeholder
  if (lastIndex < message.length) {
    result.push(message.substring(lastIndex));
  }

  return result;
}
