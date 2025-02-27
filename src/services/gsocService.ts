import { Organization, Deadline } from '../types/gsoc';

// Sample tech stacks for filtering
export const TECH_STACKS = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Rust',
  'Go',
  'Ruby',
  'PHP',
  'TypeScript',
  'Swift'
] as const;

// Sample project types
export const PROJECT_TYPES = [
  'Web Development',
  'Mobile Development',
  'Machine Learning',
  'Systems Programming',
  'DevOps',
  'Security',
  'Data Science',
  'Blockchain',
] as const;

// Available years
export const YEARS = [2024, 2023, 2022, 2021, 2020] as const;

// Sample organizations data (we'll replace this with actual API data later)
const SAMPLE_ORGANIZATIONS: Organization[] = [
  // Security Organizations
  {
    name: 'Wireshark',
    techStack: ['C++'],
    projectType: 'Security',
    year: 2024,
    description: 'The world\'s foremost and widely-used network protocol analyzer.',
    websiteUrl: 'https://www.wireshark.org',
    githubUrl: 'https://github.com/wireshark/wireshark',
  },
  {
    name: 'OWASP',
    techStack: ['Python', 'Java', 'JavaScript'],
    projectType: 'Security',
    year: 2024,
    description: 'The Open Web Application Security Project, focused on improving software security.',
    websiteUrl: 'https://owasp.org',
    githubUrl: 'https://github.com/OWASP',
  },
  {
    name: 'Rust Security',
    techStack: ['Rust'],
    projectType: 'Security',
    year: 2024,
    description: 'Security tools and libraries for the Rust ecosystem.',
    websiteUrl: 'https://rust-security.org',
    githubUrl: 'https://github.com/rust-secure',
  },
  {
    name: 'Metasploit',
    techStack: ['Ruby'],
    projectType: 'Security',
    year: 2024,
    description: 'The world\'s most used penetration testing framework.',
    websiteUrl: 'https://www.metasploit.com',
    githubUrl: 'https://github.com/rapid7/metasploit-framework',
  },
  {
    name: 'Chef',
    techStack: ['Ruby'],
    projectType: 'DevOps',
    year: 2024,
    description: 'Infrastructure automation framework that makes it easy to deploy servers and applications to any physical, virtual, or cloud location.',
    websiteUrl: 'https://www.chef.io',
    githubUrl: 'https://github.com/chef/chef',
  },
  {
    name: 'SciRuby',
    techStack: ['Ruby'],
    projectType: 'Data Science',
    year: 2024,
    description: 'Tools for scientific computing in Ruby, including NMatrix and other numerical computation libraries.',
    websiteUrl: 'http://sciruby.com',
    githubUrl: 'https://github.com/sciruby',
  },
  {
    name: 'RubyMotion',
    techStack: ['Ruby'],
    projectType: 'Mobile Development',
    year: 2024,
    description: 'Write cross-platform native apps in Ruby for iOS, Android and macOS.',
    websiteUrl: 'http://www.rubymotion.com',
    githubUrl: 'https://github.com/HipByte/RubyMotion',
  },
  // Mobile Development
  {
    name: 'React Native',
    techStack: ['JavaScript', 'TypeScript'],
    projectType: 'Mobile Development',
    year: 2024,
    description: 'Build native mobile apps using React.',
    websiteUrl: 'https://reactnative.dev',
    githubUrl: 'https://github.com/facebook/react-native',
  },
  {
    name: 'Flutter',
    techStack: ['Dart'],
    projectType: 'Mobile Development',
    year: 2024,
    description: 'Google\'s UI toolkit for building natively compiled applications.',
    websiteUrl: 'https://flutter.dev',
    githubUrl: 'https://github.com/flutter/flutter',
  },
  // Data Science
  {
    name: 'Pandas',
    techStack: ['Python'],
    projectType: 'Data Science',
    year: 2024,
    description: 'Powerful data manipulation and analysis library for Python.',
    websiteUrl: 'https://pandas.pydata.org',
    githubUrl: 'https://github.com/pandas-dev/pandas',
  },
  {
    name: 'R Project',
    techStack: ['R'],
    projectType: 'Data Science',
    year: 2024,
    description: 'Statistical computing and graphics software.',
    websiteUrl: 'https://www.r-project.org',
    githubUrl: 'https://github.com/r-project',
  },
  // DevOps additions
  {
    name: 'Jenkins',
    techStack: ['Java'],
    projectType: 'DevOps',
    year: 2024,
    description: 'The leading open source automation server.',
    websiteUrl: 'https://jenkins.io',
    githubUrl: 'https://github.com/jenkinsci/jenkins',
  },
  {
    name: 'Ansible',
    techStack: ['Python'],
    projectType: 'DevOps',
    year: 2024,
    description: 'Automation for cloud provisioning, configuration management, and application deployment.',
    websiteUrl: 'https://www.ansible.com',
    githubUrl: 'https://github.com/ansible/ansible',
  },
  // Systems Programming
  {
    name: 'LLVM',
    techStack: ['C++'],
    projectType: 'Systems Programming',
    year: 2024,
    description: 'Collection of modular and reusable compiler and toolchain technologies.',
    websiteUrl: 'https://llvm.org',
    githubUrl: 'https://github.com/llvm/llvm-project',
  },
  // Blockchain
  {
    name: 'Solana',
    techStack: ['Rust'],
    projectType: 'Blockchain',
    year: 2024,
    description: 'High-performance blockchain platform.',
    websiteUrl: 'https://solana.com',
    githubUrl: 'https://github.com/solana-labs/solana',
  },
  {
    name: 'Hyperledger',
    techStack: ['Go', 'JavaScript'],
    projectType: 'Blockchain',
    year: 2024,
    description: 'Enterprise-grade blockchain technologies.',
    websiteUrl: 'https://www.hyperledger.org',
    githubUrl: 'https://github.com/hyperledger',
  },
  // Machine Learning
  {
    name: 'Scikit-learn',
    techStack: ['Python'],
    projectType: 'Machine Learning',
    year: 2024,
    description: 'Machine learning library for Python.',
    websiteUrl: 'https://scikit-learn.org',
    githubUrl: 'https://github.com/scikit-learn/scikit-learn',
  },
  // Additional Web Development
  {
    name: 'Fastify',
    techStack: ['JavaScript', 'TypeScript'],
    projectType: 'Web Development',
    year: 2024,
    description: 'Fast and low overhead web framework for Node.js.',
    websiteUrl: 'https://www.fastify.io',
    githubUrl: 'https://github.com/fastify/fastify',
  },
  {
    name: 'Ruby Gems',
    techStack: ['Ruby'],
    projectType: 'Web Development',
    year: 2024,
    description: 'Package manager for the Ruby programming language.',
    websiteUrl: 'https://rubygems.org',
    githubUrl: 'https://github.com/rubygems/rubygems',
  },
  {
    name: 'Eclipse Foundation',
    techStack: ['Java'],
    projectType: 'Web Development',
    year: 2024,
    description: 'A community for individuals and organizations who wish to collaborate on open source software.',
    websiteUrl: 'https://www.eclipse.org',
    githubUrl: 'https://github.com/eclipse',
  },
  {
    name: 'Apache Software Foundation',
    techStack: ['Java', 'Python', 'C++'],
    projectType: 'Systems Programming',
    year: 2024,
    description: 'The world\'s largest open source foundation, providing software for the public good.',
    websiteUrl: 'https://apache.org',
    githubUrl: 'https://github.com/apache',
  },
  {
    name: 'Spring Framework',
    techStack: ['Java'],
    projectType: 'Web Development',
    year: 2024,
    description: 'The most popular application development framework for enterprise Java.',
    websiteUrl: 'https://spring.io',
    githubUrl: 'https://github.com/spring-projects/spring-framework',
  },
  {
    name: 'WordPress',
    techStack: ['PHP', 'JavaScript'],
    projectType: 'Web Development',
    year: 2024,
    description: 'The world\'s most popular website builder and content management system.',
    websiteUrl: 'https://wordpress.org',
    githubUrl: 'https://github.com/WordPress/WordPress',
  },
  {
    name: 'Laravel',
    techStack: ['PHP'],
    projectType: 'Web Development',
    year: 2024,
    description: 'The PHP Framework for Web Artisans.',
    websiteUrl: 'https://laravel.com',
    githubUrl: 'https://github.com/laravel/laravel',
  },
  {
    name: 'Drupal',
    techStack: ['PHP', 'JavaScript'],
    projectType: 'Web Development',
    year: 2024,
    description: 'An open-source content management platform powering millions of websites.',
    websiteUrl: 'https://www.drupal.org',
    githubUrl: 'https://github.com/drupal/drupal',
  },
  {
    name: 'Angular',
    techStack: ['TypeScript', 'JavaScript'],
    projectType: 'Web Development',
    year: 2024,
    description: 'A development platform for building mobile and desktop web applications.',
    websiteUrl: 'https://angular.io',
    githubUrl: 'https://github.com/angular/angular',
  },
  {
    name: 'Deno',
    techStack: ['TypeScript', 'Rust'],
    projectType: 'Systems Programming',
    year: 2024,
    description: 'A modern runtime for JavaScript and TypeScript.',
    websiteUrl: 'https://deno.land',
    githubUrl: 'https://github.com/denoland/deno',
  },
  {
    name: 'Docker',
    techStack: ['Go'],
    projectType: 'DevOps',
    year: 2024,
    description: 'A platform for developing, shipping, and running applications in containers.',
    websiteUrl: 'https://www.docker.com',
    githubUrl: 'https://github.com/docker/docker-ce',
  },
  {
    name: 'TensorFlow',
    techStack: ['Python', 'C++', 'JavaScript'],
    projectType: 'Machine Learning',
    year: 2024,
    description: 'An open-source machine learning framework for everyone.',
    websiteUrl: 'https://www.tensorflow.org',
    githubUrl: 'https://github.com/tensorflow/tensorflow',
  },
  {
    name: 'React',
    techStack: ['JavaScript', 'TypeScript'],
    projectType: 'Web Development',
    year: 2024,
    description: 'A JavaScript library for building user interfaces.',
    websiteUrl: 'https://reactjs.org',
    githubUrl: 'https://github.com/facebook/react',
  },
  {
    name: 'Rust Foundation',
    techStack: ['Rust'],
    projectType: 'Systems Programming',
    year: 2024,
    description: 'Empowering everyone to build reliable and efficient software.',
    websiteUrl: 'https://foundation.rust-lang.org',
    githubUrl: 'https://github.com/rust-lang/rust',
  },
  {
    name: 'Django Software Foundation',
    techStack: ['Python'],
    projectType: 'Web Development',
    year: 2024,
    description: 'The Web framework for perfectionists with deadlines.',
    websiteUrl: 'https://www.djangoproject.com',
    githubUrl: 'https://github.com/django/django',
  },
  {
    name: 'Swift Project',
    techStack: ['Swift'],
    projectType: 'Mobile Development',
    year: 2024,
    description: 'The Swift programming language and its ecosystem.',
    websiteUrl: 'https://swift.org',
    githubUrl: 'https://github.com/apple/swift',
  },
  {
    name: 'Kubernetes',
    techStack: ['Go'],
    projectType: 'DevOps',
    year: 2024,
    description: 'Production-Grade Container Orchestration.',
    websiteUrl: 'https://kubernetes.io',
    githubUrl: 'https://github.com/kubernetes/kubernetes',
  },
  {
    name: 'Ruby on Rails',
    techStack: ['Ruby'],
    projectType: 'Web Development',
    year: 2023,
    description: 'A web-application framework that includes everything needed to create database-backed web applications.',
    websiteUrl: 'https://rubyonrails.org',
    githubUrl: 'https://github.com/rails/rails',
  },
  {
    name: 'PyTorch',
    techStack: ['Python', 'C++'],
    projectType: 'Machine Learning',
    year: 2023,
    description: 'An open source machine learning framework.',
    websiteUrl: 'https://pytorch.org',
    githubUrl: 'https://github.com/pytorch/pytorch',
  },
  {
    name: 'Node.js',
    techStack: ['JavaScript', 'C++'],
    projectType: 'Web Development',
    year: 2023,
    description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    websiteUrl: 'https://nodejs.org',
    githubUrl: 'https://github.com/nodejs/node',
  },
  {
    name: 'Bitcoin Core',
    techStack: ['C++'],
    projectType: 'Blockchain',
    year: 2023,
    description: 'The original Bitcoin client and the heart of the Bitcoin network.',
    websiteUrl: 'https://bitcoincore.org',
    githubUrl: 'https://github.com/bitcoin/bitcoin',
  },
  {
    name: 'Qt Project',
    techStack: ['C++', 'QML'],
    projectType: 'Mobile Development',
    year: 2024,
    description: 'Cross-platform software development framework for desktop, mobile, and embedded systems.',
    websiteUrl: 'https://www.qt.io',
    githubUrl: 'https://github.com/qt',
  },
  {
    name: 'PHPUnit',
    techStack: ['PHP'],
    projectType: 'DevOps',
    year: 2024,
    description: 'The PHP Testing Framework, essential for test-driven development and continuous integration.',
    websiteUrl: 'https://phpunit.de',
    githubUrl: 'https://github.com/sebastianbergmann/phpunit',
  },
  {
    name: 'PHP-ML',
    techStack: ['PHP'],
    projectType: 'Machine Learning',
    year: 2024,
    description: 'Machine Learning library for PHP. Algorithms, Neural Networks, and tools for training models.',
    websiteUrl: 'https://php-ml.org',
    githubUrl: 'https://github.com/php-ai/php-ml',
  },
  {
    name: 'PHPIDS',
    techStack: ['PHP'],
    projectType: 'Security',
    year: 2024,
    description: 'PHP Intrusion Detection System, protecting web applications from attacks.',
    websiteUrl: 'https://phpids.org',
    githubUrl: 'https://github.com/PHPIDS/PHPIDS',
  },
  {
    name: 'PHP-Analytics',
    techStack: ['PHP'],
    projectType: 'Data Science',
    year: 2024,
    description: 'Statistical analysis and data visualization library for PHP applications.',
    websiteUrl: 'https://php-analytics.com',
    githubUrl: 'https://github.com/php-analytics/php-analytics',
  },
  {
    name: 'NestJS',
    techStack: ['TypeScript'],
    projectType: 'DevOps',
    year: 2024,
    description: 'A progressive Node.js framework for building efficient and scalable server-side applications.',
    websiteUrl: 'https://nestjs.com',
    githubUrl: 'https://github.com/nestjs/nest',
  },
  {
    name: 'TypeGraphQL',
    techStack: ['TypeScript'],
    projectType: 'Data Science',
    year: 2024,
    description: 'Modern framework for building GraphQL APIs in Node.js with TypeScript, with focus on data processing and validation.',
    websiteUrl: 'https://typegraphql.com',
    githubUrl: 'https://github.com/MichalLytek/type-graphql',
  },
  {
    name: 'Snyk',
    techStack: ['TypeScript'],
    projectType: 'Security',
    year: 2024,
    description: 'Security platform to find and fix vulnerabilities in open source dependencies and container images.',
    websiteUrl: 'https://snyk.io',
    githubUrl: 'https://github.com/snyk/snyk',
  },
  {
    name: 'TensorFlow.js',
    techStack: ['TypeScript', 'JavaScript'],
    projectType: 'Machine Learning',
    year: 2024,
    description: 'A JavaScript/TypeScript library for training and deploying ML models in the browser and on Node.js.',
    websiteUrl: 'https://www.tensorflow.org/js',
    githubUrl: 'https://github.com/tensorflow/tfjs',
  },
  {
    name: 'Ethers.js',
    techStack: ['TypeScript'],
    projectType: 'Blockchain',
    year: 2024,
    description: 'Complete Ethereum wallet implementation and utilities in TypeScript.',
    websiteUrl: 'https://ethers.org',
    githubUrl: 'https://github.com/ethers-io/ethers.js',
  },
  {
    name: 'Vapor',
    techStack: ['Swift'],
    projectType: 'Web Development',
    year: 2024,
    description: 'Server-side Swift web framework for building fast, scalable applications.',
    websiteUrl: 'https://vapor.codes',
    githubUrl: 'https://github.com/vapor/vapor',
  },
  {
    name: 'Swift Security',
    techStack: ['Swift'],
    projectType: 'Security',
    year: 2024,
    description: 'Cryptography and security tools for Swift applications.',
    websiteUrl: 'https://swift.org/security',
    githubUrl: 'https://github.com/apple/swift-crypto',
  },
  {
    name: 'CreateML',
    techStack: ['Swift'],
    projectType: 'Machine Learning',
    year: 2024,
    description: 'Apple\'s framework for building and training machine learning models in Swift.',
    websiteUrl: 'https://developer.apple.com/machine-learning/create-ml',
    githubUrl: 'https://github.com/apple/create-ml',
  },
  {
    name: 'Swift Numerics',
    techStack: ['Swift'],
    projectType: 'Data Science',
    year: 2024,
    description: 'Mathematical operations and utilities for Swift scientific computing.',
    websiteUrl: 'https://github.com/apple/swift-numerics',
    githubUrl: 'https://github.com/apple/swift-numerics',
  },
  {
    name: 'Swift System',
    techStack: ['Swift'],
    projectType: 'Systems Programming',
    year: 2024,
    description: 'Low-level system interfaces for Swift.',
    websiteUrl: 'https://github.com/apple/swift-system',
    githubUrl: 'https://github.com/apple/swift-system',
  },
  {
    name: 'Swift-DocC',
    techStack: ['Swift'],
    projectType: 'DevOps',
    year: 2024,
    description: 'Documentation compiler for Swift packages and frameworks.',
    websiteUrl: 'https://www.swift.org/documentation/docc',
    githubUrl: 'https://github.com/apple/swift-docc',
  },
  {
    name: 'Swift Web3',
    techStack: ['Swift'],
    projectType: 'Blockchain',
    year: 2024,
    description: 'Swift implementation of Web3 protocols for blockchain development.',
    websiteUrl: 'https://github.com/Boilertalk/Web3.swift',
    githubUrl: 'https://github.com/Boilertalk/Web3.swift',
  },
  {
    name: 'Actix',
    techStack: ['Rust'],
    projectType: 'Web Development',
    year: 2024,
    description: 'Powerful, pragmatic, and extremely fast web framework for Rust.',
    websiteUrl: 'https://actix.rs',
    githubUrl: 'https://github.com/actix/actix-web',
  },
  {
    name: 'Tokio',
    techStack: ['Rust'],
    projectType: 'DevOps',
    year: 2024,
    description: 'A runtime for writing reliable asynchronous applications with Rust.',
    websiteUrl: 'https://tokio.rs',
    githubUrl: 'https://github.com/tokio-rs/tokio',
  },
  {
    name: 'Linfa',
    techStack: ['Rust'],
    projectType: 'Machine Learning',
    year: 2024,
    description: 'A Rust machine learning framework emphasizing type safety and ergonomics.',
    websiteUrl: 'https://rust-ml.github.io/linfa/',
    githubUrl: 'https://github.com/rust-ml/linfa',
  },
  {
    name: 'Polars',
    techStack: ['Rust'],
    projectType: 'Data Science',
    year: 2024,
    description: 'Lightning-fast DataFrame library for Rust and Python, written in Rust.',
    websiteUrl: 'https://pola.rs',
    githubUrl: 'https://github.com/pola-rs/polars',
  },
  {
    name: 'Tauri',
    techStack: ['Rust'],
    projectType: 'Mobile Development',
    year: 2024,
    description: 'Build smaller, faster, and more secure desktop and mobile applications with a web frontend.',
    websiteUrl: 'https://tauri.app',
    githubUrl: 'https://github.com/tauri-apps/tauri',
  },
];

// Sample deadlines data
const SAMPLE_DEADLINES: Deadline[] = [
  {
    program: 'GSoC',
    phase: 'Organization Applications',
    date: '2024-02-01',
    description: 'Organizations can begin submitting applications to participate in GSoC 2024',
    url: 'https://summerofcode.withgoogle.com/get-started'
  },
  {
    program: 'GSoC',
    phase: 'Organization Announcement',
    date: '2024-02-21',
    description: 'Accepted GSoC 2024 mentor organizations announced',
    url: 'https://summerofcode.withgoogle.com/get-started'
  },
  {
    program: 'GSoC',
    phase: 'Student Applications',
    date: '2024-03-18',
    description: 'Student application period begins',
    url: 'https://summerofcode.withgoogle.com/get-started'
  },
  {
    program: 'GSoC',
    phase: 'Student Application Deadline',
    date: '2024-04-02',
    description: 'Student application deadline',
    url: 'https://summerofcode.withgoogle.com/get-started'
  },
  {
    program: 'Outreachy',
    phase: 'Initial Applications',
    date: '2024-02-05',
    description: 'Initial applications open for Outreachy',
    url: 'https://www.outreachy.org/apply'
  },
  {
    program: 'Outreachy',
    phase: 'Contribution Period',
    date: '2024-03-01',
    description: 'Contribution period begins',
    url: 'https://www.outreachy.org/docs/applicant'
  }
];

// Favorites management
const FAVORITES_KEY = 'gsoc_favorite_organizations';

export function getFavoriteOrganizations(): string[] {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function toggleFavorite(orgName: string): void {
  const favorites = getFavoriteOrganizations();
  const index = favorites.indexOf(orgName);
  
  if (index === -1) {
    favorites.push(orgName);
  } else {
    favorites.splice(index, 1);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function fetchOrganizations(): Promise<Organization[]> {
  // Get favorites to mark organizations
  const favorites = getFavoriteOrganizations();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const orgsWithFavorites = SAMPLE_ORGANIZATIONS.map(org => ({
        ...org,
        isFavorite: favorites.includes(org.name)
      }));
      resolve(orgsWithFavorites);
    }, 500);
  });
}

export async function fetchDeadlines(): Promise<Deadline[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SAMPLE_DEADLINES);
    }, 500);
  });
}

export async function fetchOrganizationsByYear(year: number): Promise<Organization[]> {
  const organizations = await fetchOrganizations();
  return organizations.filter(org => org.year === year);
}

export async function searchOrganizations(query: string): Promise<Organization[]> {
  const organizations = await fetchOrganizations();
  const lowercaseQuery = query.toLowerCase();
  
  return organizations.filter(org => 
    org.name.toLowerCase().includes(lowercaseQuery) ||
    org.description.toLowerCase().includes(lowercaseQuery) ||
    org.techStack.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
    org.projectType.toLowerCase().includes(lowercaseQuery)
  );
} 