type EventData = {
  event: string;
} & Record<string, unknown>;

const triggerNativeEventFor = (elm: Element, { event, ...valueObj }: EventData) => {
  if (!(elm instanceof Element)) {
    throw new Error(`Expected an Element but received ${elm} instead!`);
  }

  const [prop, value] = Object.entries(valueObj)[0] ?? [];
  const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(elm), prop);

  desc?.set?.call(elm, value);
  elm.dispatchEvent(new Event(event, { bubbles: true }));
};

export default triggerNativeEventFor;

