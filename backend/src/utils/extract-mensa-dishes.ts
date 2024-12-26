interface MensaDish {
  date: string;
  dish_name: string;
  dish_category: string;
}

function extractDishes(html: string): MensaDish[] {
  const dishes: MensaDish[] = [];

  // Extract date from the HTML
  const dateMatch = html.match(/<h4>([^<]+)<\/h4>/);
  const date = dateMatch ? dateMatch[1].split(' ').slice(1).join(' ') : '';

  // Split the HTML into sections for each dish
  const sections = html.split('<br>');

  // Process each section
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i].trim();

    // Check for dish category using regex to match any Essen number
    const categoryMatch = section.match(/(Aktionsessen \d+|Essen \d+)/);

    if (categoryMatch) {
      const category = categoryMatch[1];

      // The dish name is in the next section
      if (i + 1 < sections.length) {
        let dishText = sections[i + 1];

        // Replace <sup> tags with their content
        dishText = dishText.replace(
          /<sup><b>\[([^\]]+)\]<\/b><\/sup>/g,
          '[$1]'
        );

        // Clean up any remaining HTML tags and normalize whitespace
        const dishName = dishText
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        if (
          dishName &&
          !dishName.includes('€') &&
          !dishName.includes('Tipp des Tages')
        ) {
          dishes.push({
            date,
            dish_name: dishName,
            dish_category: category,
          });
        }
      }
    }
  }

  return dishes;
}

export { MensaDish, extractDishes };
