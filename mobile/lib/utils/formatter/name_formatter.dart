class NameFormatter {
  static String removeSpaceFromFirstIndex(String input) {
    int firstNonSpaceIndex = input.indexOf(RegExp(r'\S'));
    if (firstNonSpaceIndex != -1) {
      return input.substring(firstNonSpaceIndex);
    } else {
      return input;
    }
  }

  static List<String> separateNameAndFamilyName(String input) {
    int lastSpaceIndex = input.lastIndexOf(' ');

    if (lastSpaceIndex >= 0 && lastSpaceIndex < input.length - 1) {
      String firstPart = input.substring(0, lastSpaceIndex);
      String secondPart = input.substring(lastSpaceIndex + 1);

      return [firstPart, secondPart];
    } else {
      return [];
    }
  }
}
