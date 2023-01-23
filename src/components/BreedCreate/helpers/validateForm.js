export default function validateForm(input) {
  const errors = {};

  const containsSymbols = /[!@#$%^&*(),.?":{}|<>]/;
  const containsLetters = /[a-zA-Z]/;
  const containNumbers = /^\d+$/;
  const isHttpsLink =
    /^https:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/;

  const isArrayOfStrings = (arr) =>
    Array.isArray(arr) && arr?.every((el) => typeof el === "string");
  const stringsWithoutNumbers = (arr) =>
    arr?.some((el) => containNumbers.test(el));
  const stringsWithoutSymbols = (arr) =>
    arr?.some((el) => containsSymbols.test(el));

  if (!input.name) errors.name = "Name is required";
  if (containsSymbols.test(input.name) || containNumbers.test(input.name))
    errors.name = "The name cannot contain symbols or numbers";

  if (!input.weightMin || !input.weightMax || !input.weight)
    errors.weight = "Weight values are required";
  if (
    containsSymbols.test(input.weightMin) ||
    containsSymbols.test(input.weightMax) ||
    containsSymbols.test(input.weight) ||
    containsLetters.test(input.weightMin) ||
    containsLetters.test(input.weightMax) ||
    containsLetters.test(input.weight)
  )
    errors.weight = "The weight cannot contain symbols or letters";
  if (input.weightMin > 90) errors.weight = "Minimum weight cannot exceed 90kg";
  if (input.weightMin < 1)
    errors.weight = "Minimum weight cannot be less than 1kg";
  if (input.weightMax > 99) errors.weight = "Maximum weight cannot exceed 99kg";
  if (input.weightMax < 2)
    errors.weight = "Maximum weight cannot be less than 1kg";
  if (input.weightMin === input.weightMax)
    errors.weight = "The minimum and maximun weight cannot be equal";
  if (input.weightMin > input.weightMax)
    errors.weight =
      "The minimun weight can't be higher than the maximum weight";

  if (!input.heightMin || !input.heightMax || !input.height)
    errors.height = "Height span values are required";
  if (
    containsSymbols.test(input.heightMin) ||
    containsSymbols.test(input.heightMax) ||
    containsSymbols.test(input.height) ||
    containsLetters.test(input.heightMin) ||
    containsLetters.test(input.heightMax) ||
    containsLetters.test(input.height)
  )
    errors.height = "The height cannot contain symbols or letters";
  if (input.heightMin > 10) errors.height = "Minimum height cannot exceed 10cm";
  if (input.heightMin < 5)
    errors.height = "Minimum height cannot be less than 5cm";
  if (input.heightMax > 99) errors.height = "Maximum height cannot exceed 99cm";
  if (input.heightMax < 6)
    errors.height = "Maximum height cannot be less than 6cm";
  if (input.heightMin === input.heightMax)
    errors.height = "The minimum and maximun height cannot be equal";
  if (input.heightMin > input.heightMax)
    errors.height =
      "The minimun height can't be higher than the maximum height";

  if (!input.lifeSpanMin || !input.lifeSpanMmax || !input.life_span)
    errors.life_span = "Life span values are required";
  if (
    containsSymbols.test(input.lifeSpanMin) ||
    containsSymbols.test(input.lifeSpanMax) ||
    containsSymbols.test(input.life_span) ||
    containsLetters.test(input.lifeSpanMin) ||
    containsLetters.test(input.lifeSpanMax) ||
    containsLetters.test(input.life_span)
  )
    errors.life_span = "The life span cannot contain symbols or letters";
  if (input.lifeSpanMin > 25)
    errors.life_span = "Minimum life span cannot exceed 25 years";
  if (input.lifeSpanMin < 1)
    errors.life_span = "Minimum life span cannot be less than 1 year";
  if (input.lifeSpanMax > 30)
    errors.life_span = "Maximum life span cannot exceed 30 years";
  if (input.lifeSpanMax < 2)
    errors.life_span = "Maximum life span cannot be less than 2 years";
  if (input.lifeSpanMin === input.lifeSpanMax)
    errors.life_span = "The minimum and maximun life span cannot be equal";
  if (input.lifeSpanMin > input.lifeSpanMax)
    errors.life_span =
      "The minimum life span height can't be higher than the maximum life span";

  if (!input.imageUrl || !isHttpsLink.test(input.imageUrl))
    errors.imageUrl = "Must upload a photo of the dog";

  if (!input.temperament)
    errors.temperament = "Must select at least one temperament";
  if (!isArrayOfStrings(input.temperament))
    errors.temperament = "Temperaments has to be a list of words";
  if (
    stringsWithoutNumbers(input.temperament) ||
    stringsWithoutSymbols(input.temperament)
  )
    errors.temperament = "The temperaments can't contain numbers or symbols";

  if (!input.breed_group) errors.breed_group = "Must select at least one group";
  if (!isArrayOfStrings(input.breed_group))
    errors.breed_group = "Group has to be a list of words";
  if (
    stringsWithoutNumbers(input.breed_group) ||
    stringsWithoutSymbols(input.breed_group)
  )
    errors.breed_group = "The groups can't contain numbers or symbols";

  if (!input.origin) errors.origin = "Must select at least one country";
  if (!isArrayOfStrings(input.origin))
    errors.origin = "Countries has to be a list of words";
  if (stringsWithoutNumbers() || stringsWithoutSymbols())
    errors.origin = "The country or countries can't contain numbers or symbols";

  return errors;
}
