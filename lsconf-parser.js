window.lsParse = async function(path, objectName) {
  try {
    const response = await fetch(path);
    const text = await response.text();
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    const data = [];
    let rules = {};
    let current = {};
    let inRules = true;
    let id = 1;
    for (const line of lines) {
      if (inRules) {
        if (line.includes(' - ')) {
          const [key, desc] = line.split(' - ');
          rules[key.trim()] = desc.trim();
        } else {
          inRules = false;
        }
      }
      if (!inRules) {
        const [key, value] = line.split('~');
        if (rules[key]) {
          current[rules[key]] = value;
          if (Object.keys(current).length === Object.keys(rules).length) {
            current.id = objectName + id++;
            data.push(current);
            current = {};
          }
        }
      }
    }
    window[objectName] = data;
  } catch (error) {
    console.error('LSCE=>', error);
    window[objectName] = [];
  }
};