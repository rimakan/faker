import type { Faker } from '.';
import * as random_ua from './utils/user-agent';

/**
 * Module to generate internet related entries.
 */
export class Internet {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Internet.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random avatar url.
   *
   * @example
   * faker.internet.avatar()
   * // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/315.jpg'
   */
  avatar(): string {
    return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${this.faker.datatype.number(
      1249
    )}.jpg`;
  }

  /**
   * Generates an email address using the given person's name as base.
   *
   * @param firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param provider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
   *
   * @example
   * faker.internet.email() // 'Kassandra4@hotmail.com'
   * faker.internet.email('Jeanne', 'Doe') // 'Jeanne63@yahoo.com'
   * faker.internet.email('Jeanne', 'Doe', 'example.fakerjs.dev') // 'Jeanne_Doe88@example.fakerjs.dev'
   */
  email(firstName?: string, lastName?: string, provider?: string): string {
    provider =
      provider ||
      this.faker.random.arrayElement(
        this.faker.definitions.internet.free_email
      );
    return (
      this.faker.helpers.slugify(
        this.faker.internet.userName(firstName, lastName)
      ) +
      '@' +
      provider
    );
  }

  /**
   * Generates an email address using an example mail provider using the given person's name as base.
   *
   * @param firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @example
   * faker.internet.exampleEmail() // 'Helmer.Graham23@example.com'
   * faker.internet.exampleEmail('Jeanne', 'Doe') // 'Jeanne96@example.net'
   */
  exampleEmail(firstName?: string, lastName?: string): string {
    const provider = this.faker.random.arrayElement(
      this.faker.definitions.internet.example_email
    );
    return this.email(firstName, lastName, provider);
  }

  /**
   * Generates a username using the given person's name as base.
   *
   * @param firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @example
   * faker.internet.userName() // 'Nettie_Zboncak40'
   * faker.internet.userName('Jeanne', 'Doe') // 'Jeanne98'
   */
  userName(firstName?: string, lastName?: string): string {
    let result: string;
    firstName = firstName || this.faker.name.firstName();
    lastName = lastName || this.faker.name.lastName();
    switch (this.faker.datatype.number(2)) {
      case 0:
        result = `${firstName}${this.faker.datatype.number(99)}`;
        break;
      case 1:
        result =
          firstName + this.faker.random.arrayElement(['.', '_']) + lastName;
        break;
      case 2:
        result = `${firstName}${this.faker.random.arrayElement([
          '.',
          '_',
        ])}${lastName}${this.faker.datatype.number(99)}`;
        break;
    }
    result = result.toString().replace(/'/g, '');
    result = result.replace(/ /g, '');
    return result;
  }

  /**
   * Returns a random web protocol. Either `http` or `https`.
   *
   * @example
   * faker.internet.protocol() // 'http'
   * faker.internet.protocol() // 'https'
   */
  protocol(): 'http' | 'https' {
    const protocols: ['http', 'https'] = ['http', 'https'];
    return this.faker.random.arrayElement(protocols);
  }

  /**
   * Returns a random http method.
   *
   * Can be either of the following:
   *
   * - `GET`
   * - `POST`
   * - `PUT`
   * - `DELETE`
   * - `PATCH`
   *
   * @example
   * faker.internet.httpMethod() // 'PATCH'
   */
  httpMethod(): 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' {
    const httpMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] = [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
    ];
    return this.faker.random.arrayElement(httpMethods);
  }

  /**
   * Generates a random url.
   *
   * @example
   * faker.internet.url() // 'https://remarkable-hackwork.info'
   */
  url(): string {
    return (
      this.faker.internet.protocol() + '://' + this.faker.internet.domainName()
    );
  }

  /**
   * Generates a random domain name.
   *
   * @example
   * faker.internet.domainName() // 'slow-timer.info'
   */
  domainName(): string {
    return (
      this.faker.internet.domainWord() +
      '.' +
      this.faker.internet.domainSuffix()
    );
  }

  /**
   * Returns a random domain suffix.
   *
   * @example
   * faker.internet.domainSuffix() // 'com'
   * faker.internet.domainSuffix() // 'name'
   */
  domainSuffix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.internet.domain_suffix
    );
  }

  /**
   * Generates a random domain word.
   *
   * @example
   * faker.internet.domainWord() // 'close-reality'
   * faker.internet.domainWord() // 'weird-cytoplasm'
   */
  domainWord(): string {
    return (this.faker.word.adjective() + '-' + this.faker.word.noun())
      .replace(/([\\~#&*{}/:<>?|\"'])/gi, '')
      .replace(/\s/g, '-')
      .replace(/-{2,}/g, '-')
      .toLowerCase();
  }

  /**
   * Generates a random IPv4 address.
   *
   * @example
   * faker.internet.ip() // '245.108.222.0'
   */
  ip(): string {
    // TODO @Shinigami92 2022-03-21: We may want to return a IPv4 or IPv6 address here in a later major release
    return this.ipv4();
  }

  /**
   * Generates a random IPv4 address.
   *
   * @example
   * faker.internet.ipv4() // '245.108.222.0'
   */
  ipv4(): string {
    const randNum = () => {
      return this.faker.datatype.number(255).toFixed(0);
    };

    const result: string[] = [];
    for (let i = 0; i < 4; i++) {
      result[i] = randNum();
    }

    return result.join('.');
  }

  /**
   * Generates a random IPv6 address.
   *
   * @example
   * faker.internet.ipv6() // '269f:1230:73e3:318d:842b:daab:326d:897b'
   */
  ipv6(): string {
    const randHash = () => {
      let result = '';
      for (let i = 0; i < 4; i++) {
        result += this.faker.random.arrayElement([
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
        ]);
      }
      return result;
    };

    const result: string[] = [];
    for (let i = 0; i < 8; i++) {
      result[i] = randHash();
    }
    return result.join(':');
  }

  /**
   * Generates a random port number.
   *
   * @example
   * faker.internet.port() // '9414'
   */
  port(): number {
    return this.faker.datatype.number({ min: 0, max: 65535 });
  }

  /**
   * Generates a random user agent string.
   *
   * @example
   * faker.internet.userAgent()
   * // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
   */
  userAgent(): string {
    return random_ua.generate(this.faker);
  }

  /**
   * Generates a random css hex color code.
   *
   * @param baseRed255 The optional base red. Used for aesthetically pleasing color palettes. Supports values between `0` and `255`. Defaults to `0`.
   * @param baseGreen255 The optional base green. Used for aesthetically pleasing color palettes. Supports values between `0` and `255`. Defaults to `0`.
   * @param baseBlue255 The optional base blue. Used for aesthetically pleasing color palettes. Supports values between `0` and `255`. Defaults to `0`.
   *
   * @example
   * faker.internet.color() // '#30686e'
   * faker.internet.color(100, 100, 100) // '#4e5f8b'
   */
  color(
    baseRed255: number = 0,
    baseGreen255: number = 0,
    baseBlue255: number = 0
  ): string {
    // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
    const red = Math.floor((this.faker.datatype.number(256) + baseRed255) / 2);
    const green = Math.floor(
      (this.faker.datatype.number(256) + baseGreen255) / 2
    );
    const blue = Math.floor(
      (this.faker.datatype.number(256) + baseBlue255) / 2
    );
    const redStr = red.toString(16);
    const greenStr = green.toString(16);
    const blueStr = blue.toString(16);
    return (
      '#' +
      (redStr.length === 1 ? '0' : '') +
      redStr +
      (greenStr.length === 1 ? '0' : '') +
      greenStr +
      (blueStr.length === 1 ? '0' : '') +
      blueStr
    );
  }

  /**
   * Generates a random mac address.
   *
   * @param sep The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
   *
   * @example
   * faker.internet.mac() // '32:8e:2e:09:c6:05'
   */
  mac(sep?: string): string {
    let i: number;
    let mac = '';
    let validSep = ':';

    // if the client passed in a different separator than `:`,
    // we will use it if it is in the list of acceptable separators (dash or no separator)
    if (['-', ''].indexOf(sep) !== -1) {
      validSep = sep;
    }

    for (i = 0; i < 12; i++) {
      mac += this.faker.datatype.number(15).toString(16);
      if (i % 2 === 1 && i !== 11) {
        mac += validSep;
      }
    }
    return mac;
  }

  /**
   * Generates a random password.
   *
   * @param len The length of the password to generate. Defaults to `15`.
   * @param memorable Whether the generated password should be memorable. Defaults to `false`.
   * @param pattern The pattern that all chars should match should match. Defaults to `/\w/`.
   * @param prefix The prefix to use. Defaults to `''`.
   *
   * @example
   * faker.internet.password() // '89G1wJuBLbGziIs'
   * faker.internet.password(20) // 'aF55c_8O9kZaPOrysFB_'
   * faker.internet.password(20, true) // 'lawetimufozujosodedi'
   * faker.internet.password(20, true, /[A-Z]/) // 'HMAQDFFYLDDUTBKVNFVS'
   * faker.internet.password(20, true, /[A-Z]/, 'Hello ') // 'Hello IREOXTDWPERQSB'
   */
  password(
    len?: number,
    memorable?: boolean,
    pattern?: RegExp,
    prefix?: string
  ): string {
    len = len || 15;
    if (memorable == null) {
      memorable = false;
    }
    /*
     * password-generator ( function )
     * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
     * MIT Licensed
     */
    const vowel = /[aeiouAEIOU]$/;
    const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
    const _password = (
      length = 10,
      memorable = true,
      pattern = /\w/,
      prefix = ''
    ): string => {
      let char: string;
      if (prefix.length >= length) {
        return prefix;
      }
      if (memorable) {
        if (prefix.match(consonant)) {
          pattern = vowel;
        } else {
          pattern = consonant;
        }
      }
      const n = this.faker.datatype.number(94) + 33;
      char = String.fromCharCode(n);
      if (memorable) {
        char = char.toLowerCase();
      }
      if (!char.match(pattern)) {
        return _password(length, memorable, pattern, prefix);
      }
      return _password(length, memorable, pattern, '' + prefix + char);
    };
    return _password(len, memorable, pattern, prefix);
  }
}
