# DeepStrictTypes 라이브러리 문서

## 목차

1. [소개](#소개)
2. [DeepStrictObjectKeys](#DeepStrictObjectKeys)
3. [DeepStrictOmit](#DeepStrictOmit)
4. [DeepStrictPick](#DeepStrictPick)
5. [StringToDeepObject](#StringToDeepObject)
6. [DeepStrictMerge](#DeepStrictMerge)
7. [DeepDateToString](#DeepDateToString)

## 소개

DeepStrictTypes 라이브러리는 TypeScript의 타입 조작 기능을 한 단계 업그레이드한 도구입니다.  
복잡한 중첩 객체나 배열에서도 `Omit`, `Pick` 같은 작업을 안전하게 처리할 수 있도록 도와줘요.  
타입스크립트 기본 유틸리티 타입들이 가진 한계를 보완해, 개발자가 내부 키를 손쉽게 다룰 수 있도록 엄격하면서도 정확한 타입 추론을 제공합니다.

주요 기능은 아래와 같아요:

- **안전한 중첩 키 추출:** 객체 안의 모든 키를 정확하게 뽑아내서 타입 안정성을 높입니다.
- **정밀한 타입 조작:** 중첩 구조에서도 필요한 키만 선택하거나 제거할 수 있어, 복잡한 데이터 구조를 깔끔하게 다룰 수 있습니다.
- **브랜딩 제거 및 병합:** 불필요한 제약 없이 여러 타입을 깔끔하게 합칠 수 있어요.
- **유틸리티 함수 지원 (실험적):** 실제 런타임에서 타입 안전성을 검증할 수 있는 함수들도 준비되어 있습니다.

아래 GIF는 이 라이브러리가 어떻게 사용되는지 보여줍니다.

![example](https://github.com/user-attachments/assets/28316425-8302-453e-b238-0c732606e6a7)

## DeepStrictObjectKeys

`DeepStrictObjectKeys`는 중첩 객체의 모든 키를 뽑아서, 계층 구조를 그대로 유지한 문자열 유니온 타입으로 만들어줍니다.  
즉, 최상위 키뿐 아니라 내부 객체의 키들도 "user.address.city" 같이 점(dot) 표기법이나 배열의 경우 `[*]` 표기법을 사용해서 접근할 수 있어요.

### 주요 특징

- **계층 구조 유지:** 객체 안에 있는 모든 키를 뽑아서, "user.address.city"처럼 경로를 표현할 수 있습니다.
- **정밀한 타입 추론:** 단순히 `keyof`만 사용하는 게 아니라 모든 내부 키를 꼼꼼하게 추론해서 타입 안정성을 높여줍니다.
- **배열 지원:** 배열 내부 객체의 경우, 인덱스 대신 `[*]`를 써서 모든 요소를 한 번에 표현할 수 있어요.

### 사용 예제

다음 예제는 `DeepStrictObjectKeys`를 써서 중첩 객체의 키들을 어떻게 뽑는지 보여줍니다.

```typescript
type Example = {
  user: {
    name: string;
    address: {
      city: string;
      zip: number;
    };
  };
};

// 결과: "user" | "user.name" | "user.address" | "user.address.city" | "user.address.zip"
type Keys = DeepStrictObjectKeys<Example>;
```

또한, 라이브러리에서는 이 타입을 기반으로 실제 객체에서 중첩 키를 추출하는 유틸리티 함수 `deepStrictObjectKeys`도 제공해요.  
이 함수는 일반 `Object.keys`와 비슷하게 동작하지만, 중첩된 구조에서도 올바른 경로를 뽑아낼 수 있도록 설계되었습니다.

```typescript
type Target = { a: 1 }[][];
const keys = deepStrictObjectKeys({} as Target); // 결과: ["[*].[*].a"]
```

## DeepStrictOmit

`DeepStrictOmit`은 중첩 객체 타입에서 특정 키(들)를 제거해 새로운 타입으로 만들어 줍니다.  
기존 `Omit`과 비슷하지만, 중첩된 구조에서도 정밀하게 키 경로를 지정할 수 있고, 객체뿐 아니라 배열 안의 객체도 처리할 수 있어요.

### 주요 특징

- **중첩 키 제거:** `"user.profile.name"` 같이 중첩된 경로를 지정해 그 키만 제거할 수 있습니다.
- **배열 내 객체 처리:** 배열 내부의 객체에도 동일한 방식으로 적용해서, 모든 요소에서 특정 키를 제거할 수 있어요.
- **정확한 타입 추론:** 제거 후에도 원래 객체의 구조와 타입을 잘 유지해 줍니다.
- **브랜딩 타입 지원:** 브랜딩된 타입에서도 안전하게 작동해 불필요한 제약을 없애줍니다.

### 사용 예제

아래 예제에서는 중첩 객체와 배열 내 객체에 `DeepStrictOmit`을 적용하는 방법을 보여줍니다.

```typescript
// 예제 객체 타입 정의
type Example = {
  user: {
    id: string;
    profile: {
      name: string;
      age: number;
      email: string;
    };
    posts: {
      title: string;
      content: string;
      meta: {
        likes: number;
        shares: number;
      };
    }[];
  };
};

// 'user.profile.email'과 'user.posts[*].meta.shares' 키를 제거
type Omitted = DeepStrictOmit<Example, 'user.profile.email' | 'user.posts[*].meta.shares'>;

/*
  결과 타입 Omitted:
  {
    user: {
      id: string;
      profile: {
        name: string;
        age: number;
      };
      posts: {
        title: string;
        content: string;
        meta: {
          likes: number;
        };
      }[];
    };
  }
*/
```

즉, `DeepStrictOmit`을 쓰면 복잡한 중첩 객체나 배열에서도 특정 키만 깔끔하게 제거할 수 있어요.

## DeepStrictPick

`DeepStrictPick`은 중첩 객체 타입에서 특정 키(들)만 선택해 새로운 타입으로 만들어 주는 도구입니다.  
기존의 `Pick`과 비슷하지만, 중첩 구조에서도 정밀하게 키 경로를 지정할 수 있고, 배열 내 객체도 원하는 속성만 골라낼 수 있어요.

### 주요 특징

- **중첩 키 선택:** `"user.profile.name"`처럼 중첩된 경로를 지정해 그 키만 선택할 수 있습니다.
- **배열 내 객체 처리:** 배열 내부의 객체에서도 필요한 키만 골라내어 원하는 데이터 구조를 만들 수 있습니다.
- **정확한 타입 추론:** 선택한 속성만 남겨서 타입 안정성과 가독성을 높여 줍니다.
- **유연성:** 여러 중첩 키를 동시에 지정해 선택할 수 있어요.

### 사용 예제

아래 예제는 중첩 객체와 배열 내 객체에서 `DeepStrictPick`을 사용하는 방법을 보여줍니다.

```typescript
// 예제 객체 타입 정의
type Example = {
  user: {
    id: string;
    profile: {
      name: string;
      age: number;
      email: string;
    };
    posts: {
      title: string;
      content: string;
      meta: {
        likes: number;
        shares: number;
      };
    }[];
  };
};

// 'user.profile.name'과 'user.posts[*].meta.likes' 키만 선택
type Picked = DeepStrictPick<Example, 'user.profile.name' | 'user.posts[*].meta.likes'>;

/*
  결과 타입 Picked:
  {
    user: {
      profile: {
        name: string;
      };
      posts: {
        meta: {
          likes: number;
        };
      }[];
    };
  }
*/
```

즉, `DeepStrictPick`을 통해 원하는 속성만 뽑아서 간결하고 명확한 타입을 만들 수 있습니다.

## StringToDeepObject

`StringToDeepObject`는 점(dot) 표기법으로 표현된 문자열 경로를 기반으로, 그 경로에 해당하는 중첩 객체 타입을 만들어 주는 유틸리티입니다.  
주어진 경로 문자열을 하나씩 쪼개서 객체를 중첩해 나가고, 마지막 속성에 원하는 타입을 할당합니다.

### 주요 특징

- **경로 문자열 파싱:** "user.profile.name"처럼 점으로 구분된 문자열을 받아, 각 부분을 객체의 키로 변환해 줍니다.
- **동적 객체 생성:** 경로에 따라 자동으로 중첩 객체를 생성하며, 최종 속성에 원하는 타입을 할당할 수 있습니다.
- **유니온 타입 병합:** 여러 경로 문자열을 유니온 타입으로 전달하면, 각 경로에 해당하는 객체들을 병합해 하나의 합성된 타입을 만들어 줍니다.
- **타입 안전성:** 문자열 경로를 안전하게 처리해서, 중첩 구조를 정확하게 표현합니다.

### 사용 예제

```typescript
// 'user.profile.name' 경로에 string 타입을 할당하는 예제
type DeepObj = StringToDeepObject<'user.profile.name', string>;

/*
  결과 타입 DeepObj:
  {
    user: {
      profile: {
        name: string;
      };
    };
  }
*/

// 경로의 최종 값에 number 타입을 할당하는 예제
type DeepNumberObj = StringToDeepObject<'settings.display.brightness', number>;

/*
  결과 타입 DeepNumberObj:
  {
    settings: {
      display: {
        brightness: number;
      };
    };
  }
*/

// 유니온 타입 예제: 두 개의 경로가 병합되어 하나의 객체 타입으로 합성됨
type MergedObj = StringToDeepObject<'user.profile.name' | 'user.profile.age', string | number>;

/*
  결과 타입 MergedObj:
  {
    user: {
      profile: {
        name: string;
        age: number;
      };
    };
  }
*/
```

즉, `StringToDeepObject`를 쓰면 경로 문자열 하나로부터 쉽게 중첩 객체 타입을 만들어 낼 수 있고, 여러 경로도 병합할 수 있습니다.

## DeepStrictMerge

`DeepStrictMerge`는 두 개 이상의 객체 타입을 깊게 병합해 하나의 통합된 타입으로 만들어 줍니다.  
중첩된 구조의 모든 속성을 재귀적으로 병합하며, 동일한 키가 여러 객체에 있을 경우 정해진 규칙에 따라 합쳐집니다.

### 주요 특징

- **깊은 병합:** 최상위뿐 아니라 중첩된 모든 객체 속성을 재귀적으로 병합해 줍니다.
- **정확한 타입 추론:** 각 객체의 타입 정보가 병합된 결과 타입에 모두 반영되어, 타입 안정성이 보장됩니다.
- **충돌 해결:** 동일 키가 여러 객체에 있을 때, 병합 규칙에 따라 올바른 타입으로 합성합니다.
- **유연성:** 여러 객체 타입을 한 번에 병합할 수 있어, 복잡한 데이터 구조를 효과적으로 관리할 수 있습니다.

### 사용 예제

```typescript
// 병합할 두 객체 타입 정의
type ObjA = {
  user: {
    id: string;
    profile: {
      name: string;
      age: number;
    };
  };
};

type ObjB = {
  user: {
    profile: {
      email: string;
      // 동일 키 'age'가 있을 경우 병합 규칙에 따라 처리됨
      age: number;
    };
    settings: {
      theme: string;
    };
  };
};

// 두 객체를 깊게 병합하여 하나의 타입으로 생성
type Merged = DeepStrictMerge<ObjA, ObjB>;

/*
  결과 타입 Merged:
  {
    user: {
      id: string;
      profile: {
        name: string;
        age: number;  // 병합 규칙에 따라 처리된 결과
        email: string;
      };
      settings: {
        theme: string;
      };
    };
  }
*/
```

즉, `DeepStrictMerge`를 쓰면 서로 다른 객체 타입들을 하나로 깔끔하게 합쳐서 복잡한 데이터 구조도 쉽게 관리할 수 있습니다.

## DeepDateToString

`DeepDateToString`은 객체 타입 내의 모든 `Date` 타입을 재귀적으로 찾아서 `string`으로 바꿔 주는 유틸리티입니다.  
객체 깊숙한 곳에 있는 모든 `Date` 속성을 문자열로 변환해 주어, 데이터 직렬화나 JSON 변환 시 타입 불일치를 방지할 수 있어요.

### 주요 특징

- **재귀적 변환:** 최상위뿐 아니라 중첩된 객체나 배열 내부의 모든 `Date` 타입을 찾아서 문자열로 바꿔 줍니다.
- **타입 안정성 보장:** `Date` 타입을 명확히 `string`으로 변환해, 직렬화나 API 응답 처리에서 타입 불일치를 예방합니다.
- **복잡한 데이터 구조 지원:** 중첩된 객체와 배열 속 `Date` 타입도 안전하게 변환할 수 있어 다양한 상황에서 유용합니다.

### 사용 예제

```typescript
// 예제 객체 타입 정의
type Example = {
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    birthDate: Date;
    posts: {
      title: string;
      publishedAt: Date;
    }[];
  };
};

// DeepDateToString을 적용하여 모든 Date 속성을 string으로 변환
type StringifiedExample = DeepDateToString<Example>;

/*
  결과 타입 StringifiedExample:
  {
    createdAt: string;
    updatedAt: string;
    user: {
      name: string;
      birthDate: string;
      posts: {
        title: string;
        publishedAt: string;
      }[];
    };
  }
*/
```

즉, `DeepDateToString`을 사용하면 객체 안의 모든 `Date`를 문자열로 바꿔서, 데이터 직렬화나 JSON 변환 등 타입 일관성이 중요한 작업을 안정적으로 처리할 수 있습니다.
