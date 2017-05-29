export function commaText(items, andOr) {
    const { length } = items;
    return items
        .map((item, index) => {
            if (index === 0) {
                return item;
            }
            if (index <= length - 2) {
                return `, ${item}`;
            }
            return ` ${andOr} ${item}`;
        })
        .join('');
}
